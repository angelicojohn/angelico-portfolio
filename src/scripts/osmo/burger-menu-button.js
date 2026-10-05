// Osmo: Burger Menu Button — original: /osmo/burger-menu-button/script.js
// Change: ES module; returns { open, close } instead of binding its own click,
// so main.js can sync it to [data-navigation-status] (ESC + link clicks close both).
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase)
CustomEase.create("button-ease", "0.5, 0.05, 0.05, 0.99")

export function initMenuButton() {
  // Select elements
  const menuButton = document.querySelector("[data-menu-button]");
  if (!menuButton) return;
  const lines = document.querySelectorAll(".menu-button-line");
  const [line1, line2, line3] = lines;

  // Define one global timeline
  let menuButtonTl = gsap.timeline({
    defaults:{
      overwrite:"auto",
      ease: "button-ease",
  	  duration: 0.3
    }
  })

  const menuOpen = () => {
    menuButtonTl.clear() // Stop any previous tweens, if any
    .to(line2, { scaleX: 0, opacity: 0 }) // Step 1: Hide middle line
    .to(line1, { x: "-1.3em", opacity: 0 }, "<") // Step 1: Movetop line
    .to(line3, { x: "1.3em", opacity: 0 }, "<") // Step 1: Move bottom line
    .to([line1,line3],{opacity:0, duration: 0.1},"<+=0.2") // Step 2: Quickly fade top and bottom lines
    .set(line1, { rotate: -135, y: "-1.3em", scaleX: 0.9 }) // Step 3: Instantly rotate and scale top line
    .set(line3, { rotate: 135, y: "-1.4em", scaleX: 0.9 }, "<") // Step 3: Instantly rotate and scale bottom line
    .to(line1, { opacity: 1, x: "0em", y: "0.5em"}) // Step 4: Move top line to final position
    .to(line3, { opacity: 1, x: "0em", y: "-0.25em" }, "<+=0.1"); // Step 4: Move bottom line to final position
  }

  const menuClose = () => {
    menuButtonTl.clear() // Stop any previous tweens, if any
    .to([line1, line2, line3], { // Move all lines back in a different animation
      scaleX: 1,
      rotate: 0,
      x: "0em",
      y: "0em",
      opacity: 1,
      duration: 0.45,
      overwrite: "auto",
    })
  }

  return {
    open() {
      if (menuButton.getAttribute("data-menu-button") === "close") return;
      menuOpen()
      menuButton.setAttribute("data-menu-button", "close");
    },
    close() {
      if (menuButton.getAttribute("data-menu-button") === "burger") return;
      menuClose()
      menuButton.setAttribute("data-menu-button", "burger");
    },
  };
}
