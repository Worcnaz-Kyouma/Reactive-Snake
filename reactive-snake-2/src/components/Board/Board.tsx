import { useEffect, useRef, useState } from "react"
import { APPLE, columnSize, rowSize } from "../../constants"
import Field from "../Field/Field"

import './Board.css'

type GameData = {
    gameStatus: number
    setGameStatus: React.Dispatch<React.SetStateAction<number>>

    snakeData: {
        length: number,
        headField: {
            x: number,
            y:number
        }
    }
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

    boardValues: number[][]
    setBoardValues: React.Dispatch<React.SetStateAction<number[][]>>

    needSync: boolean
    setSyncNecessity: React.Dispatch<React.SetStateAction<boolean>>

    isAppleEated: boolean
    setAppleEated: React.Dispatch<React.SetStateAction<boolean>>

    setDirectionVector: React.Dispatch<React.SetStateAction<number>>
}

export default function Board({ gameStatus, setGameStatus, snakeData, setSnakeData, movementVector, boardValues, setBoardValues, needSync, setSyncNecessity, isAppleEated, setAppleEated, setDirectionVector } : GameData) {

    const timeoutIDRef = useRef<number | undefined>(undefined)

    function updateBoard() {
        setBoardValues(oldBoardValues => 
            oldBoardValues.map(row => row.map(value => {
                if(value !== APPLE)
                    value = value - 1
                return value
            })))
    }

    useEffect(() => {
        if(!needSync){
            if(typeof timeoutIDRef.current !== 'undefined' && !isAppleEated){
                updateBoard()
            } else if (isAppleEated) {
                setAppleEated(false)
            }
            timeoutIDRef.current = setTimeout(() => {
                setSyncNecessity(true)
            }, 1000)
        }
    }, [needSync])

    return gameStatus
    ?   <div className="board">
            {boardValues.map((row, rowIndex) => 
                <div key={rowIndex} className="column-wrapper">
                    {row.map((_, columnIndex) => 
                        <Field 
                            key={rowIndex*rowSize + columnIndex}

                            x={rowIndex}
                            y={columnIndex}

                            snakeData={snakeData} 
                            setSnakeData={setSnakeData} 
                
                            boardValues={boardValues} 
                            setBoardValues={setBoardValues} 
                
                            gameStatus={gameStatus} 
                            setGameStatus={setGameStatus} 
                
                            movementVector={movementVector} 
                
                            needSync={needSync} 
                            setSyncNecessity={rowIndex+1 !== rowSize && columnIndex+1 !== columnSize ? setSyncNecessity : undefined}
                            
                            setAppleEated={setAppleEated}

                            setDirectionVector={setDirectionVector}
                        />
                    )}
                </div>
            )}
        </div>
    : <div>Game over</div>
}