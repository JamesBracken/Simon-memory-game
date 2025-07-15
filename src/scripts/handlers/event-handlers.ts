// Imports-----------
import { userClicksArr, isActiveGame, incrementUserClicks } from "../services/game-state";
import { checkUserInputIsCorrect, handleStartNewGame } from "../services/game-logic";
import { brightenColor } from "../utils/brighten-color";
import { startGameBtn, circles } from "../constants";
import { Modal } from "bootstrap";
// Global variables
// These variables are dom selectors however are placed in this
// file because they are only used here
const restartGameBtn = document.querySelector<HTMLButtonElement>("#restartGameBtn");
const confirmRestartGameBtn = document.querySelector<HTMLButtonElement>("#confirmRestartGameBtn");

// Type guards------------

if (!restartGameBtn) {
    throw new Error("The restart game button cannot be found");
}

if (!confirmRestartGameBtn) {
    throw new Error("The confirm restart game button cannot be found");
}

// Functions---------

/** Handles a user clicking a circle. Adds the circle size to the userClicksArr
 * array, triggers UI effects and logic functions. 
 * 
 * @param {click} e - Information of the event that triggers the function 
 * @returns void 
 */
const handleCircleClick = (e: Event) => {
    const targetedCircle = e.target as HTMLDivElement;
    const circleSize = targetedCircle.dataset.circleSize;
    if (!targetedCircle || !circleSize) {
        throw new Error("The selected circle does not exist, what a conundrum!\
            Either that or its size isnt present");
    }
    userClicksArr.push(circleSize);
    brightenColor(targetedCircle);
    incrementUserClicks();
    checkUserInputIsCorrect();
}
/** Handles a user clicking the start button. Starts a game if there isn't an
 * active one, if otherwise opens a modal to confirm game restart.
 * 
 * @returns void 
 */
const handleStartGameBtnClick = (): void => {
    if (!isActiveGame) {
        handleStartNewGame();
    } else {
        const gameEndModal = document.querySelector("#confirmGameRestartModal");
        if (!gameEndModal) {
            throw new Error("The game end modal has not been found, it may be undefined");
        }
        const modal = new Modal(gameEndModal);
        modal.show();
    }
}

// Event listeners--------

/** Attaches all initially required event listeners for the game. Handles user 
 * interactions related to UI effects or updates, game logic and modal control. 
 * 
 * @returns void
 */
export const attachEventListeners = (): void =>{

    startGameBtn.addEventListener("click", handleStartGameBtnClick);

    circles.forEach((circle) => {
        circle.addEventListener("click", handleCircleClick);
    });

    restartGameBtn.addEventListener("click", (): void => {
        const modalEl = document.querySelector("#gameEndModal");
        if (!modalEl) {
            throw new Error("The modal with id gameEndModal cannot be found");
        }
        const modal = Modal.getInstance(modalEl);
        if (!modal) {
            throw new Error("The modal gameEndModal instance cannot be found");
        }
        modal.hide();
        handleStartNewGame();
    })

    confirmRestartGameBtn.addEventListener("click", (): void => {
        const gameEndModal = document.querySelector("#confirmGameRestartModal");
        if (!gameEndModal) {
            throw new Error("The game end modal cannot be found");
        }
        const modal = Modal.getInstance(gameEndModal);
        if (!modal) {
            throw new Error("The game modal instance cannot be found");
        }
        modal.hide();
        handleStartNewGame();
    })
}
