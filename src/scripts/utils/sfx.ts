// Imports
import sine1 from "@/assets/audio/sine-1.mp3";
import sine2 from "@/assets/audio/sine-2.mp3";
import sine3 from "@/assets/audio/sine-3.mp3";
import sine4 from "@/assets/audio/sine-4.mp3";
import buttonClick from "@/assets/audio/button-click.mp3";
import gameEnd from "@/assets/audio/game-end.wav";
import gameStart from "@/assets/audio/game-start.mp3";
import { Howl } from "howler";

// Global variables
export const sfx = {
    // Howler recommends placing audio sources in arrays to be able to place 
    // backup audio/formats incase of incompatibility
    smallCircle: new Howl({ src: [sine1] }),
    mediumCircle: new Howl({ src: [sine2] }),
    largeCircle: new Howl({ src: [sine3] }),
    xlargeCircle: new Howl({ src: [sine4] }),
    button: new Howl({ src: [`${buttonClick}`] }),
    gameStart: new Howl({ src: [`${gameStart}`] }),
    gameEnd: new Howl({ src: [`${gameEnd}`] }),
}

export const soundManager = (item: string) => {

    switch (item) {
        case "button":
            sfx.button.play()
            break
        case "gameEnd":
            sfx.gameEnd.play()
            break
        case "gameStart":
            sfx.gameStart.play()
            break
        case "small":
            sfx.smallCircle.play()
            break
        case "medium":
            sfx.mediumCircle.play()
            break
        case "large":
            sfx.largeCircle.play()
            break
        case "xlarge":
            sfx.xlargeCircle.play()
            break
        default:
            throw new Error(`The soundManager could not match ${item} with a sound`)
    }
}