import '../styles/main.scss';

// Global variables
const circles = document.querySelectorAll<HTMLDivElement>(".game__circle");
const circleSizeArr: string[] = ["small", "medium", "large", "xlarge"]
const startBtn = document.querySelector("#startGame")
const confirmRestartGameBtn = document.querySelector<HTMLButtonElement>("#confirmRestartGameBtn")
const restartGameBtn = document.querySelector<HTMLButtonElement>("#restartGameBtn")
const userClicksArr: string[] = [];
const randCircleOrderArr: string[] = []
let userClickCounter: number = 0;
let currentRound: number = 0;
let isActiveGame = false
//Null variable handlers
if (!circles) {
    throw new Error("There is no existing variable circles");
}

// Functions
const handleCircleClick = (e: Event) => {
    const targetedCircle = e.target;
    if (!targetedCircle) {
        throw new Error("The selected circle does not exist, what a conundrum!")
    }
    userClicksArr.push(targetedCircle.dataset.circleSize);
    brightenColor(targetedCircle);
    userClickCounter += 1;
    checkUserInputIsCorrect()
}

const brightenColor = (targetedCircle: Element) => {
    const originalCircleColor = targetedCircle.dataset.color;
    const brightColor = targetedCircle.dataset.brightColor;
    targetedCircle.style.backgroundColor = brightColor;
    setTimeout(() => {
        targetedCircle.style.backgroundColor = originalCircleColor;
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
    currentRound += 1
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
        const selectedCircle = document.querySelector(`.game__circle--${circle}`)
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
    isActiveGame = false
    toggleGameActivity()
    const gameEndModal = document.querySelector("#gameEndModal")
    const modal = new bootstrap.Modal(gameEndModal)
    modal.show()

    restartGameBtn?.addEventListener("click", () => {
        modal.hide()
        handleStartNewGame()
    })
}
// Event listeners
circles.forEach((circle) => {
    circle.addEventListener("click", handleCircleClick);
});

// If a game is active prompt the user before game restart
startBtn?.addEventListener("click", handleStartNewGame)

const toggleGameActivity = () => {
    if (!isActiveGame) {
        startBtn?.addEventListener("click", handleStartNewGame)
    } else {
        startBtn?.addEventListener("click", () => {
            const gameEndModal = document.querySelector("#confirmGameRestartModal")
            const modal = new bootstrap.Modal(gameEndModal)
            modal.show()
            confirmRestartGameBtn.addEventListener("click", () => {
                // const gameEndModal = document.querySelector("#confirmGameRestartModal")
                modal.hide()
            })
        })
    }
}
confirmRestartGameBtn.addEventListener("click", handleStartNewGame)


// Items which don't conform to other categories

