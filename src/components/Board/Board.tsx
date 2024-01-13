import "./Board.css"
import Area from "../Area/Area"
import { useEffect, useRef } from "react"

type GameData = {
    rowSize:number,
    columnSize:number,

    gameStatus: number,
    setGameStatus: React.Dispatch<React.SetStateAction<number>>

    snakeData: {
        length: number,
        headPosition: {
            x: number,
            y:number
        }
    },
    setSnakeData: React.Dispatch<React.SetStateAction<{
        length: number,
        headPosition: {
            x: number,
            y:number
        }
    }>>

    movementVector: {
        x: number,
        y: number
    },
    setMovementVector: React.Dispatch<React.SetStateAction<{
        x: number,
        y: number
    }>>

    fieldsValue: number[][],
    setFieldsValue: React.Dispatch<React.SetStateAction<number[][]>>
}

export default function Board({ rowSize, columnSize, gameStatus, setGameStatus, snakeData, setSnakeData, movementVector, setMovementVector, fieldsValue, setFieldsValue } : GameData) {
    const processLooperIDRef = useRef<number | undefined>(undefined)
    
    function moveHead() {
        return new Promise<boolean>(resolve => {
            let isApple = false

            const newFieldsValue = [ ...fieldsValue ]

            setMovementVector(movementVector => {
                let nextX = snakeData.headPosition.x + movementVector.x
                if(nextX >= rowSize)
                    nextX = 0
                else if(nextX < 0)
                    nextX = rowSize - 1
                let nextY = snakeData.headPosition.y + movementVector.y
                if(nextY >= columnSize)
                    nextY = 0
                else if(nextY < 0)
                    nextY = columnSize - 1

                if(fieldsValue[nextX][nextY] === 14488883){
                    isApple = true
                    const newApplePosition = {
                        x: 0, 
                        y: 0
                    }
                    do{
                        newApplePosition.x = Math.floor(Math.random() * rowSize)
                        newApplePosition.y = Math.floor(Math.random() * columnSize)
                    } while(fieldsValue[newApplePosition.x][newApplePosition.y] > 0)
                    fieldsValue[newApplePosition.x][newApplePosition.y] = 14488883

                } else if(fieldsValue[nextX][nextY] > 0){
                    setGameStatus(0)
                }

                newFieldsValue[nextX][nextY] = snakeData.length + 1

                const newSnakeData = { 
                    headPosition: { x: nextX,y: nextY  },
                    length: snakeData.length + (isApple ? 1 : 0)
                }

                setSnakeData(newSnakeData)
                setFieldsValue(newFieldsValue)

                resolve(isApple)
                return movementVector
            })
        })
    }

    function updateBoard(isAppleEatted:boolean) {
        if(!isAppleEatted) {
            setFieldsValue(oldFieldsValue => 
                oldFieldsValue.map(row => row.map(fieldValue => {
                    if(!(fieldValue === 14488883))
                        fieldValue = fieldValue - 1
                    return fieldValue
                })))
        }
    }

    async function process() {
        const isAppleEatted = await moveHead()
        updateBoard(isAppleEatted)
    }

    useEffect(() => {
        if(gameStatus){
            clearTimeout(processLooperIDRef.current)
    
            processLooperIDRef.current = setTimeout(() => {
                process()
            }, 1000)
        }
    }, [fieldsValue])    

    return (
        gameStatus
            ?   <div className="board">
                    {fieldsValue.map((column, columnIndex) => 
                    <div key={columnIndex} className="column-wrapper">{column.map((fieldValue, rowIndex) => 
                        <Area key={(rowIndex*columnIndex + rowIndex)*1000 + fieldValue} symbolicValue={fieldValue} />)}
                    </div>
                    )}
                </div>
            : <div>Game over</div>
    )
}