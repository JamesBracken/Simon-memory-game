// Imports
import { userClicksArr, isActiveGame, incrementUserClicks } from "../services/gameState"
import { checkUserInputIsCorrect, handleStartNewGame } from "../services/gameLogic"
import { brightenColor } from "../utils/brightenColor"
import { startGameBtn, circles } from "../constants"
import { Modal } from "bootstrap";
// Global variables
// These variables are dom selectors however are placed in this
// file because they are only used here
const restartGameBtn = document.querySelector<HTMLButtonElement>("#restartGameBtn")
const confirmRestartGameBtn = document.querySelector<HTMLButtonElement>("#confirmRestartGameBtn")

// Type guards

if (!restartGameBtn) {
    throw new Error("The restart game button cannot be found")
}

if (!confirmRestartGameBtn) {
    throw new Error("The confirm restart game button cannot be found")
}

// Functions

const handleCircleClick = (e: Event) => {
    const targetedCircle = e.target as HTMLDivElement;
    const circleSize = targetedCircle.dataset.circleSize
    if (!targetedCircle || !circleSize) {
        throw new Error("The selected circle does not exist, what a conundrum!\
            Either that or its size isnt present")
    }
    userClicksArr.push(circleSize);
    brightenColor(targetedCircle);
    incrementUserClicks()
    checkUserInputIsCorrect()
}

const handleStartGameBtnClick = () => {
    if (!isActiveGame) {
        handleStartNewGame
    } else {
        const gameEndModal = document.querySelector("#confirmGameRestartModal")
        if (!gameEndModal) {
            throw new Error("The game end modal has not been found, it may be undefined")
        }
        const modal = new Modal(gameEndModal)
        modal.show()
    }
}

// Event listeners

export const attachEventListeners = () => {
    startGameBtn.addEventListener("click", handleStartGameBtnClick)

    circles.forEach((circle) => {
        circle.addEventListener("click", handleCircleClick);
    });

    restartGameBtn.addEventListener("click", () => {
        const modalEl = document.querySelector("#gameEndModal")
        if (!modalEl) {
            throw new Error("The modal with id gameEndModal cannot be found");
        }
        const modal = Modal.getInstance(modalEl)
        if (!modal) {
            throw new Error("The modal gameEndModal instance cannot be found");
        }
        modal.hide()
        handleStartNewGame()
    })

    // Initially settings the button event listener, adjusting in functions
    startGameBtn?.addEventListener("click", handleStartNewGame)

    confirmRestartGameBtn.addEventListener("click", () => {
        const gameEndModal = document.querySelector("#confirmGameRestartModal")
        if (!gameEndModal) {
            throw new Error("The game end modal cannot be found")
        }
        const modal = Modal.getInstance(gameEndModal)
        if (!modal) {
            throw new Error("The game modal instance cannot be found")
        }
        modal.hide()
        handleStartNewGame

    })

}
