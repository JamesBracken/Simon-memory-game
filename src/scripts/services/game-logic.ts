// Imports -------
import { userClicksArr, resetUserClicks, toggleIsActiveGame } from "./game-state"
import { startGameBtn, circles } from "../constants"
import { delay } from "../utils/delay"
import { brightenColor } from "../utils/brighten-color"
import { sfx } from "../constants";
import { Modal } from "bootstrap";

// Global variables-------

const circleSizeArr: string[] = ["small", "medium", "large", "xlarge"];
const randCircleOrderArr: string[] = [];
let currentRound: number = 0;

// Functions--------

/** Handles a new game initialization and sets up the first round.
 * 
 * @returns void
 */
export const handleStartNewGame = (): void => {
    // Resetting all variables to ensure a clean game state at game start.
    for (let i = userClicksArr.length; i > 0; i--) {
        userClicksArr.pop()
    }
    for (let i = randCircleOrderArr.length; i > 0; i--) {
        randCircleOrderArr.pop()
    }
    resetUserClicks()
    currentRound = 0
    startGameBtn.innerText = "Restart";
    handleNewRound()
    toggleIsActiveGame(true)
}

/** Initialize a new round, triggers new round game logic and UI effects.
 * 
 * @returns void
 */
const handleNewRound = async (): Promise<void> => {
    const levelDisplay = document.querySelector<HTMLHeadingElement>("#levelDisplay")
    if (!levelDisplay) {
        throw new Error("The level display does not exist ")
    }
    currentRound += 1
    levelDisplay.innerHTML = `${currentRound}`
    for (let i = userClicksArr.length; i > 0; i--) {
        userClicksArr.pop()
    }
    addRandomCircle()
    // This delay is to add a bit of separation between user inputs and
    // machine displaying color brightening each round.
    await delay(1500)
    displayGeneratedCircleOrder()
}


/** Add a random circle size to randCircleOrderArr.
 * 
 * @returns void
 */
const addRandomCircle = (): void => {
    const randomInt: number = Math.floor(Math.random() * 4)
    randCircleOrderArr.push(circleSizeArr[randomInt])
}

/** Display the stored pattern of circle sizes using circle effects.
 * 
 * @returns void
 */
const displayGeneratedCircleOrder = async (): Promise<void> => {
    for (const circle of randCircleOrderArr) {
        const selectedCircle = document.querySelector(`.game__circle--${circle}`);
        if (!selectedCircle) {
            throw new Error("The selected circle is null")
        }
        switch (circle) {
            case "small":
                sfx.smallCircle.play()
                break
            case "medium":
                sfx.mediumCircle.play()
                break
            case "large":
                sfx.largeCircle.play()
                break
            case "xlarge":
                sfx.xlargeCircle.play()
                break
            default:
                throw new Error(`${circle} sound effects not found`);
        }
        brightenColor(selectedCircle)
        // The below time delay would ideally be the same or close to the  
        // brightenColor timeout
        await delay(1000)
    }
    // Re-enabling circle events 
    circles.forEach(circle => circle.style.pointerEvents = "auto");
}

/** Compares user input vs required input then end game or start round. 
 * 
 */
export const checkUserInputIsCorrect = (): void => {
    const isUserClicksFinished = userClicksArr.length == currentRound
    const isUserClicksCorrect = userClicksArr.join() === randCircleOrderArr.join()
    if (isUserClicksFinished) {
        // Disable user clicks after reaching the correct amount of clicks,
        // this is reenabled after displaying machine generated circles.
        circles.forEach(circle => circle.style.pointerEvents = "none");
    }
    if (isUserClicksFinished && isUserClicksCorrect) {
        handleNewRound()
    }
    if (isUserClicksFinished && !isUserClicksCorrect) {
        handleEndGame()
    }
}

/** Toggle isActiveGame and displays modal with game end feedback.
 * 
 * @returns void
 */
const handleEndGame = (): void => {
    const endOfGameModalPointsDisplay = document.querySelector<HTMLSpanElement>("#endOfGameModalPointsDisplay")
    if (!endOfGameModalPointsDisplay) {
        throw new Error("The end of game modal points display does not exist")
    }
    toggleIsActiveGame(false)
    startGameBtn.innerText = "Start";
    const gameEndModal = document.querySelector("#gameEndModal")
    endOfGameModalPointsDisplay.innerHTML = `${currentRound} ${currentRound > 1 ? "points" : "point"}`
    if (!gameEndModal) {
        throw new Error("The game end modal has not been found, it may be undefined")
    }
    const modal = new Modal(gameEndModal)
    modal.show()
    startGameBtn.addEventListener("click", handleStartNewGame)
}