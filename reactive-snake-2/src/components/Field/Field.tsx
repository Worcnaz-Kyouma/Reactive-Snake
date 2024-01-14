import { useEffect } from "react"
import { APPLE, DIRECTIONS_MAP, columnSize, rowSize } from "../../constants"
import { getNewAppleField } from "../../utils"

import './Field.css'

type FieldData = {
    x: number,
    y: number

    gameStatus: number,
    setGameStatus: React.Dispatch<React.SetStateAction<number>>

    snakeData: {
        length: number,
        headField: {
            x: number,
            y:number
        }
    },
    setSnakeData: React.Dispatch<React.SetStateAction<{
        length: number,
        headField: {
            x: number,
            y:number
        }
    }>>

    movementVector: {
        x: number,
        y: number
    }

    boardValues: number[][],
    setBoardValues: React.Dispatch<React.SetStateAction<number[][]>>

    needSync: boolean,
    setSyncNecessity: React.Dispatch<React.SetStateAction<boolean>> | undefined

    setAppleEated: React.Dispatch<React.SetStateAction<boolean>>

    setDirectionVector: React.Dispatch<React.SetStateAction<number>>
}

export default function Field({ x, y, setGameStatus, snakeData, setSnakeData, movementVector, boardValues, setBoardValues, needSync, setSyncNecessity, setAppleEated, setDirectionVector } : FieldData) {

    useEffect(() => {
        if(needSync) {
            setBoardValues(oldBoardValues => {
                const newBoardValues = oldBoardValues.map(row => [ ...row ])

                if(newBoardValues[x][y] === snakeData.length){
                    let nextX = x + movementVector.x
                    if(nextX >= rowSize)
                        nextX = 0
                    else if(nextX < 0)
                        nextX = rowSize - 1

                    let nextY = y + movementVector.y
                    if(nextY >= columnSize)
                        nextY = 0
                    else if(nextY < 0)
                        nextY = columnSize - 1

                    if(newBoardValues[nextX][nextY] !== APPLE && newBoardValues[nextX][nextY] > 1){
                        setGameStatus(0)
                    }

                    newBoardValues[nextX][nextY] = snakeData.length + 1
                    if(oldBoardValues[nextX][nextY] === APPLE){
                        setAppleEated(true)
                        const newApple = getNewAppleField(newBoardValues)

                        newBoardValues[newApple.x][newApple.y] = APPLE

                        setSnakeData(oldSnakeData => ({
                            headField: oldSnakeData.headField,
                            length: oldSnakeData.length + 1
                        }))
                    }
                }
                setDirectionVector(DIRECTIONS_MAP.get(movementVector)!)

                return newBoardValues
            })
            if(typeof setSyncNecessity !== 'undefined') 
                setSyncNecessity(false)
        }
    }, [needSync])
    
    function defineType(symbolicValue:number) {
        if(symbolicValue<1)
            return "empty"
        if(symbolicValue === 14488883)
            return "apple"
        return "snake"
    }

    return (
        <div className={`field ${defineType(boardValues[x][y])}`}></div>
    )
}