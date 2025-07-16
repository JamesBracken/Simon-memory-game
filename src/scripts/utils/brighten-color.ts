// Global variables---------
export const circleColorsArr = ["game__circle--blue", "game__circle--green",
    "game__circle--red", "game__circle--yellow"];

// Functions-------

/** Brighten a circle by adding a style class for a short period
 * 
 * @param targetedCircle - A specific circle HTML element 
 * @returns void
 */
export const brightenColor = (targetedCircle: Element): void => {
    const colorClasses = [targetedCircle.classList].toString().split(" ");
    const colorClass = colorClasses.filter(elClass => circleColorsArr.includes(elClass));
    const colorBrightClass = `${colorClass}-bright`;

    targetedCircle.classList += ` ${colorBrightClass}`;
    setTimeout(() => targetedCircle.classList.remove(colorBrightClass), 700);
}