// Osmo: Welcoming Words Loader — original: /osmo/welcoming-words-loader/script.js
// Change: ES module + returns the timeline so main.js can start reveals when it ends.
import { gsap } from 'gsap';

export function initWelcomingWordsLoader() {
  const loadingContainer = document.querySelector('[data-loading-container]');
  if (!loadingContainer) return; // Stop animation when no [data-loading-words] is found

  const loadingWords = loadingContainer.querySelector('[data-loading-words]');
  const wordsTarget = loadingWords.querySelector('[data-loading-words-target]');
  const words = loadingWords.getAttribute('data-loading-words').split(',').map(w => w.trim());

  const tl = gsap.timeline();

  tl.set(loadingWords, {
    yPercent: 50
  });

  tl.to(loadingWords, {
    opacity: 1,
    yPercent: 0,
    duration: 1,
    ease: "Expo.easeInOut"
  });

  words.forEach(word => {
    tl.call(() => {
      wordsTarget.textContent = word;
    }, null, '+=0.15');
  });

  tl.to(loadingWords, {
    opacity: 0,
    yPercent: -75,
    duration: 0.8,
    ease: "Expo.easeIn"
  });

  tl.to(loadingContainer, {
    autoAlpha: 0,
    duration: 0.6,
    ease: "Power1.easeInOut"
  }, "+ -0.2");

  return tl;
}
