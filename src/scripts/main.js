// Boot order: nav → loader → reveals. See CLAUDE.md for why each Osmo port differs from the original.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { initBoldFullScreenNavigation } from './osmo/bold-full-screen-navigation.js';
import { initMenuButton } from './osmo/burger-menu-button.js';
import { initWelcomingWordsLoader } from './osmo/welcoming-words-loader.js';
import { initMaskTextScrollReveal } from './osmo/masked-text-reveal.js';
import { initScrambleOnLoad, initScrambleOnScroll, initScrambleOnHover } from './osmo/text-scramble.js';
import { initHighlightText } from './osmo/highlight-text-on-scroll.js';
import { initHighlightMarkerTextReveal } from './osmo/highlight-marker-text-reveal.js';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ------------------------------------------------------------- Navigation
function initNavigation() {
  initBoldFullScreenNavigation();
  const burger = initMenuButton();
  const nav = document.querySelector('[data-navigation-status]');
  const toggle = document.querySelector('[data-navigation-toggle="toggle"]');
  if (!nav) return;

  // Keep burger animation + aria in sync with the nav status, however it changes (click, ESC, link)
  new MutationObserver(() => {
    const open = nav.getAttribute('data-navigation-status') === 'active';
    open ? burger?.open() : burger?.close();
    toggle?.setAttribute('aria-expanded', String(open));
    toggle?.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }).observe(nav, { attributes: true, attributeFilter: ['data-navigation-status'] });

  // Close the menu when a link is chosen
  nav.querySelectorAll('[data-nav-link]').forEach((link) => {
    link.addEventListener('click', () => nav.setAttribute('data-navigation-status', 'not-active'));
  });
}

// ------------------------------------------- Work: full-page screenshot scroll
// Tall screenshots sit at the top of a 16:10 frame and scroll to the bottom on hover.
function initWorkScreenshots() {
  const frames = document.querySelectorAll('[data-work-shot]');
  const measure = () => {
    frames.forEach((frame) => {
      const img = frame.querySelector('img');
      if (!img || !img.complete) return;
      const distance = Math.max(0, img.offsetHeight - frame.offsetHeight);
      frame.style.setProperty('--shot-distance', `${-distance}px`);
      frame.style.setProperty('--shot-duration', `${Math.min(8, Math.max(1.5, distance / 700))}s`);
    });
  };
  frames.forEach((frame) => frame.querySelector('img')?.addEventListener('load', measure));
  window.addEventListener('resize', measure);
  measure();
}

// ------------------------------------------------ Projects: platform filter
function initWorkFilters() {
  const group = document.querySelector('[data-work-filters]');
  if (!group) return;
  const buttons = group.querySelectorAll('[data-filter]');
  const items = document.querySelectorAll('.work__grid > li[data-platform]');
  buttons.forEach((btn) => btn.addEventListener('click', () => {
    const f = btn.dataset.filter;
    buttons.forEach((b) => {
      const on = b === btn;
      b.classList.toggle('is--active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    items.forEach((li) => { li.hidden = f !== 'all' && li.dataset.platform !== f; });
    ScrollTrigger.refresh();
  }));
}

// --------------------------------------------- Work: cursor follower (Strobe)
function initWorkCursor() {
  const cursor = document.querySelector('[data-work-cursor]');
  if (!cursor || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const xTo = gsap.quickTo(cursor, 'x', { duration: 0.5, ease: 'power3' });
  const yTo = gsap.quickTo(cursor, 'y', { duration: 0.5, ease: 'power3' });
  window.addEventListener('mousemove', (e) => { xTo(e.clientX); yTo(e.clientY); });

  document.querySelectorAll('[data-work-card]').forEach((card) => {
    card.addEventListener('mouseenter', () => gsap.to(cursor, { scale: 1, duration: 0.4, ease: 'expo.out' }));
    card.addEventListener('mouseleave', () => gsap.to(cursor, { scale: 0, duration: 0.3, ease: 'power2.in' }));
  });
}

// ------------------------------------- Testimonials slider (BYQ nextwell-testimonials-3)
// Buttons scroll the native snap track by one card; they disable at either end.
function initTestimonials() {
  document.querySelectorAll('[data-testimonials]').forEach((root) => {
    const track = root.querySelector('[data-testimonials-track]');
    const prev = root.querySelector('[data-testimonials-prev]');
    const next = root.querySelector('[data-testimonials-next]');
    if (!track || !prev || !next) return;
    const step = () => {
      const card = track.firstElementChild;
      return card ? card.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0) : track.clientWidth;
    };
    const update = () => {
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
    };
    prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: reduceMotion ? 'auto' : 'smooth' }));
    next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: reduceMotion ? 'auto' : 'smooth' }));
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  });
}

// ------------------------------- Showcase: curved 3D carousel (weichie.com reference)
// Outward-facing cylinder: the front card is nearest and largest, side cards turn away.
// Each card is split into slices placed along the arc, so the card itself curves.
// The radius is capped to half the stage width so nothing leaves the screen.
function initShowcase() {
  const stage = document.querySelector('[data-showcase]');
  if (!stage) return;
  const cards = [...stage.querySelectorAll('[data-showcase-card]')];
  const n = cards.length;
  if (!n) return;
  const slicesPer = Number(stage.dataset.slices) || 9;
  const slices = cards.map((c) => [...c.querySelectorAll('.showcase__slice')]);
  const step = 360 / n;
  const cardArc = step * 0.86;            // card width as an angle; the rest is the gap
  const sliceArc = cardArc / slicesPer;
  let radius = 0;
  let theta = 0;                          // a card sits front and centre, like the reference
  let velocity = 0;
  const autoSpeed = reduceMotion ? 0 : -0.045; // degrees per frame
  let dragging = false, lastX = 0, moved = 0;

  const layout = () => {
    const width = stage.clientWidth;
    radius = width * (width < 768 ? 0.47 : 0.42); // edge cards (90°) project at ~±radius: inside the stage
    const sliceW = Math.round(2 * radius * Math.tan((sliceArc * Math.PI) / 360) * 100) / 100;
    const cardW = sliceW * slicesPer;
    stage.style.setProperty('--slices', slicesPer);
    stage.style.setProperty('--slice-w', `${sliceW}px`);
    stage.style.setProperty('--card-w', `${cardW}px`);
    stage.style.setProperty('--card-h', `${cardW * 1.02}px`);
    stage.style.setProperty('--showcase-perspective', `${radius * 4}px`);
  };

  const render = () => {
    cards.forEach((card, i) => {
      const a = ((i * step + theta) % 360 + 540) % 360 - 180; // -180..180, 0 = front
      const front = Math.abs(a) < 100;
      card.style.visibility = front ? 'visible' : 'hidden';
      if (!card.hasAttribute('data-clone')) card.tabIndex = front ? 0 : -1; else card.tabIndex = -1;
      if (!front) return;
      slices[i].forEach((slice, k) => {
        const sa = a + (k - (slicesPer - 1) / 2) * sliceArc;
        slice.style.transform = `rotateY(${sa}deg) translateZ(${radius}px)`;
      });
    });
  };

  layout();
  render();
  window.addEventListener('resize', () => { layout(); render(); });

  stage.addEventListener('pointerdown', (e) => {
    dragging = true; moved = 0; lastX = e.clientX; velocity = 0;
    stage.classList.add('is--dragging');
    stage.setPointerCapture(e.pointerId);
  });
  stage.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastX; lastX = e.clientX; moved += Math.abs(dx);
    const delta = (dx / radius) * (180 / Math.PI) * 0.8; // follow the finger along the arc
    theta += delta; velocity = delta;
  });
  const end = (e) => {
    if (!dragging) return;
    dragging = false; stage.classList.remove('is--dragging');
    // pointer capture retargets the click to the stage, so open the card under the pointer ourselves
    if (moved <= 6 && e.type === 'pointerup') {
      stage.releasePointerCapture?.(e.pointerId);
      const hit = document.elementFromPoint(e.clientX, e.clientY)?.closest('[data-showcase-card]');
      if (hit) window.location.href = hit.href;
    }
  };
  stage.addEventListener('pointerup', end);
  stage.addEventListener('pointercancel', end);
  stage.addEventListener('click', (e) => e.preventDefault(), true); // navigation handled above / via keyboard Enter
  cards.forEach((card) => card.addEventListener('keydown', (e) => { if (e.key === 'Enter') window.location.href = card.href; }));

  if (reduceMotion) return;
  gsap.ticker.add(() => {
    if (!dragging) {
      velocity *= 0.94;                   // inertia
      theta += velocity + autoSpeed;
    }
    render();
  });
}

// ------------------------------------------------ CTA: sphere zoom on scroll
function initCtaBall() {
  const ball = document.querySelector('[data-cta-ball]');
  if (!ball || reduceMotion) return;
  gsap.fromTo(ball, { scale: 0.8 }, {
    scale: 1.2,
    ease: 'none',
    scrollTrigger: { trigger: ball.closest('section'), start: 'top bottom', end: 'bottom top', scrub: true },
  });
}

// ---------------------------------------- Process line fill (BYQ Kelvin)
function initProcessLine() {
  const fill = document.querySelector('[data-process-line]');
  if (!fill || reduceMotion) return;
  gsap.to(fill, {
    scaleX: 1,
    duration: 1.2,
    ease: 'power2.out',
    scrollTrigger: { trigger: fill.closest('.process__rail'), start: 'top 80%', once: true },
  });
}

// --------------------------------------------------------------- Reveals
function startReveals() {
  document.documentElement.classList.add('is-loaded');
  initHighlightMarkerTextReveal(); // handles reduced motion itself
  if (reduceMotion) return;
  initMaskTextScrollReveal();
  initScrambleOnLoad();
  initScrambleOnScroll();
  initScrambleOnHover();
  initHighlightText();
}

// ------------------------------------------------------------------ Boot
initNavigation();
initWorkScreenshots();
initWorkFilters();
initWorkCursor();
initTestimonials();
initShowcase();
initCtaBall();
initProcessLine();

document.fonts.ready.then(() => {
  if (reduceMotion) {
    startReveals();
    return;
  }
  const loaderTl = initWelcomingWordsLoader();
  if (!loaderTl) {
    startReveals();
    return;
  }
  // Start reveals as the loader fades out
  loaderTl.call(startReveals, null, '-=0.5');
});
