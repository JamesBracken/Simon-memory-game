import '../styles/main.scss'

// Global variables
// Const
const smallCircle = document.querySelector<HTMLDivElement>(".game__circle--small");
const mediumCircle = document.querySelector<HTMLDivElement>(".game__circle--medium");
const largeCircle = document.querySelector<HTMLDivElement>(".game__circle--large");
const xLargeCircle = document.querySelector<HTMLDivElement>(".game__circle--xlarge");
const userClicksArr: number[] = [];
let userClickCounter: number = 0
// Let

// Event listeners
smallCircle?.addEventListener("click", handleSmallCircleClick)
mediumCircle?.addEventListener("click", handleMediumCircleClick)
largeCircle?.addEventListener("click", handleLargeCircleClick)
xLargeCircle?.addEventListener("click", handleXLargeCircleClick)
// Functions

// Here we are using regular functions instead of arrow functions since 
// function expressions will not be hoisted
function handleSmallCircleClick():void{
    console.log("handleSmallCircleClick")
    userClicksArr.push(0)
    userClickCounter+= 1
    console.log(userClickCounter)
}

function handleMediumCircleClick():void{
    console.log("handleMediumCircleClick")
    userClicksArr.push(1)
    userClickCounter+= 1
    console.log(userClickCounter)
}

function handleLargeCircleClick():void{
    console.log("handleLargeCircleClick")
    userClicksArr.push(2)
    userClickCounter+= 1
    console.log(userClickCounter)
}

function handleXLargeCircleClick():void{
    console.log("handleXLargeCircleClick")
    userClicksArr.push(3)
    userClickCounter+= 1
    console.log(userClickCounter)
}

// Items which don't conform to other categories

