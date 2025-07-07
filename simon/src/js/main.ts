import '../styles/main.scss';

// Global variables
const circles = document.querySelectorAll<HTMLDivElement>(".game__circle");
const circleSizeArr: string[] = ["small", "medium", "large", "xlarge"]
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
    if(!targetedCircle) {
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
    userClicksArr.forEach(() => userClicksArr.pop())
    userClickCounter = 0
    currentRound = 0
    handleNewRound()
}

const handleNewRound = () => {
    addRandomCircle()
    currentRound += 1
}

const addRandomCircle = () => {
    const randomInt: number = Math.floor(Math.random() * 4)
    randCircleOrderArr.push(circleSizeArr[randomInt])
}

// Event listeners
circles.forEach((circle) => {
    circle.addEventListener("click", handleCircleClick);
});


// Items which don't conform to other categories

