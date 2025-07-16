import {Howl} from "howler";
// This is a file for constants which are used across multiple files
// and are not affected by game state

// Constant variables
const BASE_URL = import.meta.env.BASE_URL
export const startBtn = document.querySelector<HTMLButtonElement>("#startGameBtn")
export const circles = document.querySelectorAll<HTMLDivElement>(".game__circle");
export const sfx = {
    // Howler recommends placing audio sources in arrays to be able to place 
    // backup audio/formats incase of incompatibility
    smallCircle:  new Howl({src: [`${BASE_URL}src/assets/audio/piano-1.wav`]}), //`${BASE_URL}src/assets/audio/piano-1.wav`,
    mediumCircle: new Howl({src: [`${BASE_URL}src/assets/audio/piano-2.wav`]}), // `${BASE_URL}src/assets/audio/piano-2.wav`,
    largeCircle:  new Howl({src: [`${BASE_URL}src/assets/audio/piano-3.wav`]}), //`${BASE_URL}src/assets/audio/piano-3.wav`,
    xlargeCircle: new Howl({src: [`${BASE_URL}src/assets/audio/piano-4.wav`]}), // `${BASE_URL}src/assets/audio/piano-4.wav`,
} 
// Type guards

if (!startBtn) {
    throw new Error("The start game button cannot be found");
}
// Creating and exporting this variable here otherwise in the file where the 
// variable is exported typescript flags it as possibly null
export const startGameBtn = startBtn

if (!circles) {
    throw new Error("There is no existing variable circles");
}