
// This is a file for constants which are used across multiple files
// and are not affected by game state

// Constant variables
export const startBtn = document.querySelector<HTMLButtonElement>("#startGameBtn")
export const circles = document.querySelectorAll<HTMLDivElement>(".game__circle");

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