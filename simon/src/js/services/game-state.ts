// This file contains variables which are used in multiple files and 
// are changed based on how the game goes AKA "game state"

// Constant variables
export const userClicksArr: string[] = [];
// Let variables
export let isActiveGame: boolean = false;
let userClickCounter: number = 0;

export const incrementUserClicks = () => userClickCounter += 1
export const resetUserClicks = () => userClickCounter = 0
export const toggleIsActiveGame =(boolean: boolean) => isActiveGame = boolean