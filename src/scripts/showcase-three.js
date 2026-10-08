// Showcase: curved 3D project carousel in three.js (reference: weichie.com hero).
// Each card is one open CylinderGeometry segment, so it curves with the ring (no seams).
// The camera sits low and looks slightly up: front card tops bow upward, side cards fall
// toward a horizon, and the back of the ring shows faintly through the gaps.
// Images are fitted like object-fit: cover; corners are rounded with an alpha map.
// Driven by GSAP's ticker: slow auto-rotate + drag with inertia. Click a card to open it.
import * as THREE from 'three';
import { gsap } from 'gsap';

const SETTINGS = {
  arc: 0.86,          // card width as a share of its slot angle (rest is the gap)
  aspect: 1.02,       // card height / card arc length
  backOpacity: 0.32,  // inside faces seen through the gaps
  autoSpeed: -0.0011, // radians per frame
  radius: 10,
  // Camera per breakpoint. distance: in ring radii (smaller = stronger perspective).
  // camHeight / lookHeight: share of card height (camHeight < 0 = just below the cards, looking up,
  // so near tops arc upward and the back of the ring shows as faint strips under the front cards).
  // fit: visible half-width in ring radii at the z=0 plane (>1 = margin, <1 = cards run off the sides).
  // offset: start angle in slots (0.5 = gap in the centre, like the desktop reference).
  desktop: { distance: 3.1, camHeight: -0.14, lookHeight: 0.62, fit: 1.22, offset: 0.5 },
  mobile:  { distance: 2.6, camHeight: -0.1,  lookHeight: 0.6,  fit: 0.56, offset: 0.12 },
};

function roundedAlpha(aspect) {
  const w = 512, h = Math.round(512 * aspect);
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const g = c.getContext('2d');
  const r = 46;
  g.fillStyle = '#000'; g.fillRect(0, 0, w, h);
  g.fillStyle = '#fff';
  g.beginPath(); g.roundRect(0, 0, w, h, r); g.fill();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.NoColorSpace;
  return t;
}

// object-fit: cover for a texture on a card of aspect (width / height)
function cover(texture, cardAspect) {
  const img = texture.image;
  if (!img) return;
  const imgAspect = img.width / img.height;
  texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
  if (imgAspect > cardAspect) {
    texture.repeat.set(cardAspect / imgAspect, 1);
    texture.offset.set((1 - texture.repeat.x) / 2, 0);
  } else {
    texture.repeat.set(1, imgAspect / cardAspect);
    texture.offset.set(0, (1 - texture.repeat.y) / 2);
  }
  texture.needsUpdate = true;
}

export function initShowcaseThree(stage, { reduceMotion }) {
  const items = [...stage.querySelectorAll('[data-showcase-item]')].map((a) => ({ href: a.href, src: a.dataset.src }));
  if (!items.length) return;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch {
    stage.classList.add('is--fallback');
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.className = 'showcase__canvas';
  renderer.domElement.setAttribute('aria-hidden', 'true');
  stage.prepend(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(10, 1, 0.1, 500);
  const ring = new THREE.Group();
  scene.add(ring);

  const n = items.length;
  const slot = (Math.PI * 2) / n;
  const thetaLength = slot * SETTINGS.arc;
  const R = SETTINGS.radius;
  const cardW = R * thetaLength;
  const cardH = cardW * SETTINGS.aspect;
  const cardAspect = cardW / cardH;

  const geometry = new THREE.CylinderGeometry(R, R, cardH, 48, 1, true, -thetaLength / 2, thetaLength);
  geometry.translate(0, cardH / 2, 0);
  const alpha = roundedAlpha(1 / cardAspect);
  const loader = new THREE.TextureLoader();
  const meshes = [];

  items.forEach((item, i) => {
    const map = loader.load(item.src, (t) => { cover(t, cardAspect); });
    map.colorSpace = THREE.SRGBColorSpace;
    map.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const front = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ map, alphaMap: alpha, transparent: true, alphaTest: 0.5, side: THREE.FrontSide }));
    const back = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ map, alphaMap: alpha, transparent: true, opacity: SETTINGS.backOpacity, side: THREE.BackSide, depthWrite: false }));
    back.renderOrder = -1;
    const card = new THREE.Group();
    card.add(back, front);
    card.rotation.y = i * slot;
    card.userData.href = item.href;
    front.userData.href = item.href;
    ring.add(card);
    meshes.push(front);
  });

  let view = SETTINGS.desktop;
  const resize = () => {
    const w = stage.clientWidth;
    const h = stage.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    view = w < 768 ? SETTINGS.mobile : SETTINGS.desktop;
    // fixed distance for consistent perspective; the lens is narrowed until the ring fits the width
    const dist = R * view.distance;
    const halfW = (R * view.fit) / dist;
    camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan(halfW / camera.aspect));
    camera.position.set(0, cardH * view.camHeight, dist);
    camera.lookAt(0, cardH * view.lookHeight, 0);
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener('resize', resize);

  // ---------- interaction
  let theta = -view.offset * slot, velocity = 0, dragging = false, lastX = 0, moved = 0, visible = true;
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const hit = (e) => {
    const r = renderer.domElement.getBoundingClientRect();
    pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    return raycaster.intersectObjects(meshes, false)[0]?.object.userData.href;
  };

  stage.addEventListener('pointerdown', (e) => {
    dragging = true; moved = 0; lastX = e.clientX; velocity = 0;
    stage.classList.add('is--dragging');
    stage.setPointerCapture(e.pointerId);
  });
  stage.addEventListener('pointermove', (e) => {
    if (dragging) {
      const dx = e.clientX - lastX; lastX = e.clientX; moved += Math.abs(dx);
      const delta = (dx / stage.clientWidth) * Math.PI * 0.9;
      theta += delta; velocity = delta;
    } else if (e.pointerType === 'mouse') {
      stage.classList.toggle('is--hover', !!hit(e));
    }
  });
  const end = (e) => {
    if (!dragging) return;
    dragging = false; stage.classList.remove('is--dragging');
    if (moved <= 6 && e.type === 'pointerup') { const href = hit(e); if (href) window.location.href = href; }
  };
  stage.addEventListener('pointerup', end);
  stage.addEventListener('pointercancel', end);

  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }).observe(stage);

  const render = () => { ring.rotation.y = theta; renderer.render(scene, camera); };
  stage.classList.add('is--ready');
  if (reduceMotion) {
    // static frame; re-render once textures arrive
    THREE.DefaultLoadingManager.onLoad = render;
    render();
    return;
  }
  gsap.ticker.add(() => {
    if (!visible) return;
    if (!dragging) { velocity *= 0.94; theta += velocity + SETTINGS.autoSpeed; }
    render();
  });
}
