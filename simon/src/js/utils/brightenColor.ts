// const variables
export const circleColorsArr = ["game__circle--blue", "game__circle--green",
    "game__circle--red", "game__circle--yellow"]

// Functions
export const brightenColor = (targetedCircle: Element) => {
    const colorClasses = [targetedCircle.classList].toString().split(" ");
    const colorClass = colorClasses.filter((elClass) => {
        return circleColorsArr.includes(elClass);
    })
    const colorBrightClass = `${colorClass}-bright`

    targetedCircle.classList += ` ${colorBrightClass}`
    setTimeout(() => {
        targetedCircle.classList.remove(colorBrightClass);
    }, 700)
}
