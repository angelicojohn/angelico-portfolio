// Osmo: Text Scramble (Load, Scroll, Hover) — original: /osmo/text-scramble/script.js
// Change: ES module (no DOMContentLoaded listener).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin, SplitText)

// Function to reveal stuff on load
export function initScrambleOnLoad(){
  let targets = document.querySelectorAll('[data-scramble="load"]')

  targets.forEach((target) => {
  	// split into seperate words + letters
    let split = new SplitText(target, {
      type: "words, chars",
      wordsClass: "word",
      charsClass: "char"
    });

    gsap.to(split.words, {
      duration: 1.2,
      stagger: 0.01,
      scrambleText: {
        text: "{original}",
        chars: 'upperCase', // experiment with different scramble characters here
        speed: 0.85,
      },
      // Once animation is done, revert the split to reduce DOM size
      onComplete: () => split.revert()
    });
  });
}

// Function to reveal stuff on scroll
export function initScrambleOnScroll(){
  let targets = document.querySelectorAll('[data-scramble="scroll"]')

  targets.forEach((target) => {
  	// Used this attribute to showcase a different character scramble, can be replaced with many scenarios
    let isAlternative = target.hasAttribute("data-scramble-alt")

    let split = new SplitText(target, {
      type: "words, chars",
      wordsClass: "word",
      charsClass: "char"
    });

    gsap.to(split.words, {
      duration: 1.4,
      stagger: 0.015,
      scrambleText: {
        text: "{original}",
        chars: isAlternative ? '▯|' : 'upperCase',  // experiment with different scramble characters here
        speed: 0.95,
      },
      scrollTrigger: {
        trigger: target,
        start: "top bottom",
        once: true
      },
      // Once animation is done, revert the split to reduce DOM size
      onComplete: () => split.revert()
    });
  });
}

export function initScrambleOnHover(){
  let targets = document.querySelectorAll('[data-scramble-hover="link"]')

  targets.forEach((target) => {
    let textEl = target.querySelector('[data-scramble-hover="target"]')
    let originalText = textEl.textContent // save original text
    let customHoverText = textEl.getAttribute("data-scramble-text") // if this attribute is present, take a custom hover text

    let split = new SplitText(textEl, {
      type: "words, chars",
      wordsClass: "word",
      charsClass: "char"
    });

    target.addEventListener("mouseenter", () => {
      gsap.to(textEl, {
        duration: 1,
        scrambleText: {
          text: customHoverText ? customHoverText : originalText,
          chars: "◊▯∆|"
        }
      });
    });

    target.addEventListener("mouseleave", () => {
      gsap.to(textEl, {
        duration: 0.6,
        scrambleText: {
          text: originalText,
          speed: 2,
          chars: "◊▯∆"
        }
      });
    });
  });
}
