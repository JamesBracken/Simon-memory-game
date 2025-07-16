// This file contains variables which are used in multiple files and 
// are changed based on how the game goes AKA "game state"

// Constant variables
export const userClicksArr: string[] = [];
// Let variables
export let isActiveGame: boolean = false;
let userClickCounter: number = 0;

/** Increment the user click counter by 1.
 * 
 * @returns number
 */
export const incrementUserClicks = (): number => userClickCounter += 1;

/** Set userClickCounter to 0.
 * 
 * @returns number 
 */
export const resetUserClicks = (): number => userClickCounter = 0;

/** Toggles game activity.
 * 
 * @param isActive - a boolean value based on game activity
 * @returns boolean
 */
export const toggleIsActiveGame = (isActive: boolean): boolean => isActiveGame = isActive;