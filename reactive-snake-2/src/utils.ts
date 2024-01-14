import { columnSize, rowSize } from "./constants"

export function getNewAppleField(boardValues: number[][]) {
    const appleField = {
        x: 0, 
        y: 0
    }
    do{
        appleField.x = Math.floor(Math.random() * rowSize)
        appleField.y = Math.floor(Math.random() * columnSize)
    } while(boardValues[appleField.x][appleField.y] > 0)

    return appleField
}