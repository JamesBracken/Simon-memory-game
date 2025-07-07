import '../styles/main.scss'

// Global variables

// Const
const circles = document.querySelectorAll<HTMLDivElement>(".game__circle")
const userClicksArr: string[] = [];

// Let
let userClickCounter: number = 0


// Functions
const handleCircleClick = (e: Event) => {
    console.log(e.target.dataset.circleSize)
}

// // Event listeners
circles.forEach((circle) => {
    circle.addEventListener("click", handleCircleClick)
})


// Items which don't conform to other categories

