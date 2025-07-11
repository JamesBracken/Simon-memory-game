import { userClicksArr, resetUserClicks, toggleIsActiveGame } from "./game-state"
import { startGameBtn, circles } from "../constants"
import { delay } from "../utils/delay"
import { brightenColor } from "../utils/brighten-color"
import { Modal } from "bootstrap";

// Global variables

const circleSizeArr: string[] = ["small", "medium", "large", "xlarge"];
const randCircleOrderArr: string[] = [];
let currentRound: number = 0;

// Functions


export const handleStartNewGame = () => {
    // Resetting all variables to ensure a clean game state at game start
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

const handleNewRound = async () => {
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
    await delay(1500)
    displayGeneratedCircleOrder()
}

const addRandomCircle = () => {
    const randomInt: number = Math.floor(Math.random() * 4)
    randCircleOrderArr.push(circleSizeArr[randomInt])
}

const displayGeneratedCircleOrder = async () => {
    for (let circle of randCircleOrderArr) {
        const selectedCircle = document.querySelector(`.game__circle--${circle}`);
        if (!selectedCircle) {
            throw new Error("The selected circle is null")
        }
        brightenColor(selectedCircle)
        // The below time delay would ideally be the same or close to the  
        // brightenColor timeout
        await delay(1000)
    }
    // Re-enabling circle events 
    circles.forEach(circle => circle.style.pointerEvents = "auto");
}

export const checkUserInputIsCorrect = () => {
    const isUserClicksFinished = userClicksArr.length == currentRound
    const isUserClicksCorrect = userClicksArr.join() === randCircleOrderArr.join()
    if (isUserClicksFinished) {
        // Disable user clicks after reaching the correct amount of clicks
        // This is reenabled after displaying machine generated circles
        circles.forEach(circle => circle.style.pointerEvents = "none");
    }
    if (isUserClicksFinished && isUserClicksCorrect) {
        handleNewRound()
    }
    if (isUserClicksFinished && !isUserClicksCorrect) {
        handleEndGame()
    }
}

const handleEndGame = () => {
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
    startGameBtn.addEventListener("click", () => {
        handleStartNewGame
    })
}