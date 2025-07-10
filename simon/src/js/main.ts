import '../styles/main.scss';
import { Modal } from "bootstrap";

// Const global variables
const circles = document.querySelectorAll<HTMLDivElement>(".game__circle");
const startBtn = document.querySelector("#startGame")
const confirmRestartGameBtn = document.querySelector<HTMLButtonElement>("#confirmRestartGameBtn")
const restartGameBtn = document.querySelector<HTMLButtonElement>("#restartGameBtn")
const circleSizeArr: string[] = ["small", "medium", "large", "xlarge"]
const circleColorsArr = ["game__circle--blue", "game__circle--green",
    "game__circle--red", "game__circle--yellow"]
const userClicksArr: string[] = [];
const randCircleOrderArr: string[] = []

// Let global variables
let userClickCounter: number = 0;
let currentRound: number = 0;
let isActiveGame: boolean = false;

// Type guards
if (!circles) {
    throw new Error("There is no existing variable circles");
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
    userClickCounter += 1;
    checkUserInputIsCorrect()
}

const brightenColor = (targetedCircle: Element) => {
    const colorClasses = [targetedCircle.classList].toString().split(" ");
    console.log(colorClasses)
    const colorClass = colorClasses.filter((elClass) => {
        console.log(elClass)
        return circleColorsArr.includes(elClass);
    })
    const colorBrightClass = `${colorClass}-bright`

    targetedCircle.classList += ` ${colorBrightClass}`
    setTimeout(() => {
        targetedCircle.classList.remove(colorBrightClass);
    }, 700)
}

const handleStartNewGame = () => {
    // Resetting all variables to ensure a clean game state at game start
    for (let i = userClicksArr.length; i > 0; i--) {
        userClicksArr.pop()
    }
    for (let i = randCircleOrderArr.length; i > 0; i--) {
        randCircleOrderArr.pop()
    }
    userClickCounter = 0
    currentRound = 0
    handleNewRound()
    isActiveGame = true
    toggleGameActivity()
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
    console.log("Firing displayGeneratedCircleOrder")
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

const delay = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const checkUserInputIsCorrect = () => {
    const isUserClicksFinished = userClicksArr.length == currentRound
    const isUserClicksCorrect = userClicksArr.join() === randCircleOrderArr.join()
    if (isUserClicksFinished) {
        // Disable user clicks after reaching the correct amount of clicks
        // This is reenabled after displaying machine generated circles
        circles.forEach(circle => circle.style.pointerEvents = "none");
    }
    if (isUserClicksFinished && isUserClicksCorrect) {
        console.log("isUserClicksFinished if block invoked",)
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
    isActiveGame = false
    toggleGameActivity()
    const gameEndModal = document.querySelector("#gameEndModal")
    endOfGameModalPointsDisplay.innerHTML = `${currentRound} ${currentRound > 1 ? "points" : "point"}`
    console.log("endOfGameModalPointsDisplay", endOfGameModalPointsDisplay)
    console.log("currentRound", currentRound)
    if (!gameEndModal) {
        throw new Error("The game end modal has not been found, it may be undefined")
    }
    const modal = new Modal(gameEndModal)
    modal.show()

    restartGameBtn?.addEventListener("click", () => {
        modal.hide()
        handleStartNewGame()
    })
}

const toggleGameActivity = () => {
    if (!isActiveGame) {
        startBtn?.addEventListener("click", handleStartNewGame)
    } else {
        startBtn?.addEventListener("click", () => {
            const gameEndModal = document.querySelector("#confirmGameRestartModal")
            if (!gameEndModal) {
                throw new Error("The game end modal has not been found, it may be undefined")
            }
            const modal = new Modal(gameEndModal)
            modal.show()
            confirmRestartGameBtn.addEventListener("click", () => {
                // const gameEndModal = document.querySelector("#confirmGameRestartModal")
                modal.hide()
            })
        })
    }
}
// Event listeners
circles.forEach((circle) => {
    circle.addEventListener("click", handleCircleClick);
});

// If a game is active prompt the user before game restart
startBtn?.addEventListener("click", handleStartNewGame)

confirmRestartGameBtn.addEventListener("click", handleStartNewGame)


// Items which don't conform to other categories should be placed here

