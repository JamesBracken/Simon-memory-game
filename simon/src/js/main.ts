import '../styles/main.scss'

// Global variables
// Const
const smallCircle = document.querySelector<HTMLDivElement>(".game__circle--small");
const mediumCircle = document.querySelector<HTMLDivElement>(".game__circle--medium");
const largeCircle = document.querySelector<HTMLDivElement>(".game__circle--large");
const xLargeCircle = document.querySelector<HTMLDivElement>(".game__circle--xlarge");

// Let

// Event listeners
smallCircle?.addEventListener("click", handleSmallCircleClick)
mediumCircle?.addEventListener("click", handleMediumCircleClick)
largeCircle?.addEventListener("click", handleLargeCircleClick)
xLargeCircle?.addEventListener("click", handleXLargeCircleClick)
// Functions

// Here we are using regular functions instead of arrow functions since 
// function expressions will not be hoisted
function handleSmallCircleClick(){
    console.log("handleSmallCircleClick")
}

function handleMediumCircleClick(){
    console.log("handleMediumCircleClick")
}

function handleLargeCircleClick(){
    console.log("handleLargeCircleClick")
}

function handleXLargeCircleClick(){
    console.log("handleXLargeCircleClick")
}

// Items which don't conform to other categories

