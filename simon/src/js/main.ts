import '../styles/main.scss';

// Global variables
const circles = document.querySelectorAll<HTMLDivElement>(".game__circle");
const circleSizeArr: string[] = ["small", "medium", "large", "xlarge"]
const startBtn = document.querySelector("#startGame")
const userClicksArr: string[] = [];
const randCircleOrderArr: string[] = []
let userClickCounter: number = 0;
let currentRound: number = 0;

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
}

const handleNewRound = () => {
    addRandomCircle()
    displayGeneratedCircleOrder()
    currentRound += 1
}

const addRandomCircle = () => {
    const randomInt: number = Math.floor(Math.random() * 4)
    randCircleOrderArr.push(circleSizeArr[randomInt])
}

const displayGeneratedCircleOrder = async() => {
    for (let circle of randCircleOrderArr) {
        const selectedCircle = document.querySelector(`.game__circle--${circle}`)
        brightenColor(selectedCircle)
        // The below time delay would ideally be the same or close to the  
        // brightenColor timeout
        await delay(1000)
    }
}

const delay =(ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}
// Event listeners
circles.forEach((circle) => {
    circle.addEventListener("click", handleCircleClick);
});

startBtn?.addEventListener("click", handleStartNewGame)


// Items which don't conform to other categories

