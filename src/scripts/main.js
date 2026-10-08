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

// ------------------------------- Showcase: curved 3D carousel (three.js, loaded on demand)
function initShowcase() {
  const stage = document.querySelector('[data-showcase]');
  if (!stage) return;
  import('./showcase-three.js')
    .then(({ initShowcaseThree }) => initShowcaseThree(stage, { reduceMotion }))
    .catch(() => stage.classList.add('is--fallback'));
}

// ------------------------------- Contact form: package preselect + submit
// Any [data-package] link (pricing/care CTAs) preselects that option; ?package=… works too.
// Submit: POST JSON to data-endpoint if set, otherwise open a pre-filled email to data-email.
function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;
  const select = form.querySelector('[data-contact-interest]');
  const status = form.querySelector('[data-contact-status]');
  const choose = (value) => {
    if (!select || !value) return;
    const option = [...select.options].find((o) => o.value === value);
    if (option) select.value = option.value;
  };
  document.querySelectorAll('[data-package]').forEach((link) => {
    link.addEventListener('click', () => choose(link.dataset.package));
  });
  choose(new URLSearchParams(window.location.search).get('package'));

  const fields = ['name', 'email', 'message'].map((name) => form.elements[name]);
  const check = (field) => {
    const ok = field.checkValidity();
    field.setAttribute('aria-invalid', String(!ok));
    const error = form.querySelector(`#${field.id}-error`);
    if (error) error.hidden = ok;
    if (!ok) field.setAttribute('aria-describedby', [field.getAttribute('aria-describedby'), error?.id].filter(Boolean).join(' '));
    return ok;
  };
  fields.forEach((field) => field.addEventListener('blur', () => field.value && check(field)));

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const invalid = fields.filter((field) => !check(field));
    if (invalid.length) { invalid[0].focus(); return; }
    const data = Object.fromEntries(new FormData(form));
    const endpoint = form.dataset.endpoint;
    if (endpoint) {
      status.textContent = 'Sending…';
      try {
        const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
        if (!res.ok) throw new Error(String(res.status));
        form.reset();
        status.textContent = 'Thanks, your message is on its way.';
      } catch {
        status.textContent = `Something went wrong. Please email ${form.dataset.email} directly.`;
      }
      return;
    }
    const subject = `Project enquiry: ${data.interest}`;
    const body = `Name: ${data.name}\nEmail: ${data.email}\nBusiness or website: ${data.company || '-'}\nInterested in: ${data.interest}\n\n${data.message}`;
    window.location.href = `mailto:${form.dataset.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.textContent = 'Your email app should open with your message ready to send.';
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
initContactForm();
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
