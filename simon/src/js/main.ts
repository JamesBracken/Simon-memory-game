import '../styles/main.scss';

// Global variables

// Const
const circles = document.querySelectorAll<HTMLDivElement>(".game__circle");
const userClicksArr: string[] = [];

// Let
let userClickCounter: number = 0;

//Null variable handlers
if (!circles) {
    throw new Error("There is no existing variable circles");
}

// Functions
const handleCircleClick = (e: Event) => {
    const targetedCircle = e.target;
    userClicksArr.push(targetedCircle.dataset.circleSize);
    brightenColor(targetedCircle);
    userClickCounter += 1;
}

const brightenColor = (targetedCircle: Element) => {
    const originalCircleColor = targetedCircle.dataset.color;
    // const circleRGBColor = getComputedStyle(originalCircleColor);
    const brightColor = targetedCircle.dataset.brightColor;
    targetedCircle.style.backgroundColor = brightColor;
    setTimeout(() => {
        targetedCircle.style.backgroundColor = originalCircleColor;
    }, 700)
}

// Event listeners
circles.forEach((circle) => {
    circle.addEventListener("click", handleCircleClick);
});


// Items which don't conform to other categories

