import '../styles/main.scss'

// Global variables

// Const
const circles = document.querySelectorAll<HTMLDivElement>(".game__circle");
const userClicksArr: string[] = [];

// Let
let userClickCounter: number = 0

//Null variable handlers
if (!circles) {
    throw new Error("There is no existing variable circles");
}

// Functions
const handleCircleClick = (e: Event) => {
    const targetedCircle = e.target
    userClicksArr.push(targetedCircle.dataset.circleSize)
    // console.log("", getComputedStyle(targetedCircle).backgroundColor)
    brightenColor(targetedCircle)
}

// Testing this code 

const brightenColor = (targetedCircle: Element) => {
    console.log(targetedCircle)
    const circleOriginalColor = getComputedStyle(targetedCircle).backgroundColor
    const brightColor = targetedCircle.dataset.brightColor
    targetedCircle.style.backgroundColor = brightColor
}

//  End of new code
// Event listeners
circles.forEach((circle) => {
    circle.addEventListener("click", handleCircleClick)
})


// Items which don't conform to other categories

