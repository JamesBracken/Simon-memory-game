import sine1 from "@/assets/audio/sine-1.mp3";
import sine2 from "@/assets/audio/sine-2.mp3";
import sine3 from "@/assets/audio/sine-3.mp3";
import sine4 from "@/assets/audio/sine-4.mp3";
import buttonClick from "@/assets/audio/button-click.mp3";
import gameEnd from "@/assets/audio/game-end.wav";
import gameStart from "@/assets/audio/game-start.mp3";

import {Howl} from "howler";
// This is a file for constants which are used across multiple files
// and are not affected by game state

// Constant variables
export const startBtn = document.querySelector<HTMLButtonElement>("#startGameBtn")
export const circles = document.querySelectorAll<HTMLDivElement>(".game__circle");
export const sfx = {
    // Howler recommends placing audio sources in arrays to be able to place 
    // backup audio/formats incase of incompatibility
    smallCircle:  new Howl({src: [sine1]}),
    mediumCircle: new Howl({src: [sine2]}),
    largeCircle:  new Howl({src: [sine3]}),
    xlargeCircle: new Howl({src: [sine4]}),
    button: new Howl({src: [`${buttonClick}`]}),
    gameStart: new Howl({src: [`${gameStart}`]}),
    gameEnd: new Howl({src: [`${gameEnd}`]}),
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