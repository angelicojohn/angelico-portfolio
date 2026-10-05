// Osmo: Masked Text Reveal (advanced) — original: /osmo/masked-text-reveal/script.js
// Changes: ES module; FOUC reset gsap.set(heading, { autoAlpha: 1 }) from Osmo's notes;
// optional [data-split-start] overrides the ScrollTrigger start (above-the-fold headings use
// "top bottom" because a clamped start of 0 never fires while the page sits at scroll 0).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText, ScrollTrigger);

const splitConfig = {
  lines: { duration: 0.8, stagger: 0.08 },
  words: { duration: 0.6, stagger: 0.06 },
  chars: { duration: 0.4, stagger: 0.01 }
}

export function initMaskTextScrollReveal() {
  document.querySelectorAll('[data-split="heading"]').forEach(heading => {
    // Reset CSS visibility here:
    gsap.set(heading, { autoAlpha: 1 })

    // Find the split type, the default is 'lines'
    const type = heading.dataset.splitReveal || 'lines'
    const typesToSplit =
      type === 'lines' ? ['lines'] :
      type === 'words' ? ['lines','words'] :
      ['lines','words','chars']

    // Split the text
    SplitText.create(heading, {
      type: typesToSplit.join(', '), // split into required elements
      mask: 'lines', // wrap each line in an overflow:hidden div
      autoSplit: true,
      linesClass: 'line',
      wordsClass: 'word',
      charsClass: 'letter',
      onSplit: function(instance) {
        const targets = instance[type] // Register animation targets
        const config = splitConfig[type] // Find matching duration and stagger from our splitConfig

        return gsap.from(targets, {
          yPercent: 110,
          duration: config.duration,
          stagger: config.stagger,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: heading,
            start: heading.dataset.splitStart || 'clamp(top 80%)',
            once: true
          }
        });
      }
    })
  })
}
