import { useEffect, useState } from "react"
import "./Game.css"
import Area from "../Area/Area"

export default function Game() {
    const [ isGameRunning, setGameRunning ] = useState(true)

    const rowSize = 8
    const columnSize = 8

    const headFirstPosition = {
        x: Math.floor(Math.random() * rowSize), 
        y: Math.floor(Math.random() * columnSize)
    }
    const appleFirstPosition = {
        x: 0, 
        y: 0
    }
    do{
        appleFirstPosition.x = Math.floor(Math.random() * rowSize)
        appleFirstPosition.y = Math.floor(Math.random() * columnSize)
    } while(appleFirstPosition.x === headFirstPosition.x && appleFirstPosition.y === headFirstPosition.y)

    const [ snakeData, setSnakeData] = useState({
        length: 1,
        headPosition: headFirstPosition
    })

    const defaultBoard = Array.from<number[], number[]>(
        { length: columnSize }, () => Array.from<number>(
        { length: rowSize }).fill(0)
    )
    defaultBoard[headFirstPosition.x][headFirstPosition.y] = 1
    defaultBoard[appleFirstPosition.x][appleFirstPosition.y] = 14488883

    const movementVector = {y: 1, x: 0}

    const [ fieldsValue, setFieldsValue ] = useState<number[][]>(defaultBoard)

    function moveHead() {
        let status = 0

        let isApple = false

        const newFieldsValue = [ ...fieldsValue ]

        let nextY = snakeData.headPosition.x + movementVector.x
        if(nextY >= rowSize)
            nextY = 0
        let nextX = snakeData.headPosition.y + movementVector.y
        if(nextX >= columnSize)
            nextX = 0

        if(fieldsValue[nextY][nextX] === 14488883){
            isApple = true
            status = 1
            const newApplePosition = {
                x: 0, 
                y: 0
            }
            do{
                newApplePosition.x = Math.floor(Math.random() * rowSize)
                newApplePosition.y = Math.floor(Math.random() * columnSize)
            } while(fieldsValue[newApplePosition.x][newApplePosition.y] > 0)
            fieldsValue[newApplePosition.x][newApplePosition.y] = 14488883

        } else if(fieldsValue[nextY][nextX] > 0){
            status = 2
        }

        newFieldsValue[nextY][nextX] = snakeData.length + 1

        const newSnakeData = {
            headPosition: { y: nextY, x: nextX  },
            length: snakeData.length + (isApple ? 1 : 0)
        }

        setSnakeData(newSnakeData)
        setFieldsValue(newFieldsValue)

        console.log(fieldsValue)
        return status
    }

    function updateBoard(status:number) {
        if(status === 0 ) {
            setFieldsValue(oldFieldsValue => 
                oldFieldsValue.map(row => row.map(fieldValue => {
                    if(!(fieldValue === 14488883))
                        fieldValue = fieldValue - 1
                    return fieldValue
                })))
        }
    }

    function process() {
        //status: 0 => nop, 1 => appleEat, 2 => loose
        const status = moveHead()
        updateBoard(status)

        return status
    }

    /*
    if(isGameRunning)
        setTimeout(() => {
            const status = process()
        }, 1000)
    */

    useEffect(() => {
        const timer = setTimeout(() => {
            const status = process()
        }, 1000)
        
        return () => clearInterval(timer)
    }, [fieldsValue, snakeData])

    return (
        isGameRunning
            ?   <div key={0} className="board">
                    {fieldsValue.map((column, columnIndex) => 
                    <div key={columnIndex} className="column-wrapper">{column.map((fieldValue, rowIndex) => 
                        <Area key={(rowIndex*columnIndex + rowIndex)*1000 + fieldValue} symbolicValue={fieldValue} />)}
                    </div>
                    )}
                </div>
            : <div key={1}>Game over</div>
    )
}