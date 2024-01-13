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
        setFieldsValue(oldFieldsValue => {
            console.log('old', oldFieldsValue)
            let nextY = snakeData.headPosition.x + movementVector.x
            if(nextY >= rowSize)
                nextY = 0
            let nextX = snakeData.headPosition.y + movementVector.y
            if(nextX >= columnSize)
                nextX = 0

            if(oldFieldsValue[nextY][nextX] === 14488883){
                isApple = true
                status = 1
                const newApplePosition = {
                    x: 0, 
                    y: 0
                }
                do{
                    newApplePosition.x = Math.floor(Math.random() * rowSize)
                    newApplePosition.y = Math.floor(Math.random() * columnSize)
                } while(oldFieldsValue[newApplePosition.x][newApplePosition.y] > 0)
                oldFieldsValue[newApplePosition.x][newApplePosition.y] = 14488883

            } else if(oldFieldsValue[nextY][nextX] > 0){
                status = 2
            }

            oldFieldsValue[nextY][nextX] = snakeData.length + 1

            setSnakeData(oldData => ({
                headPosition: { y: nextY, x: nextX  },
                length: oldData.length + (isApple ? 1 : 0)
            }))

            console.log('new', oldFieldsValue)
            return oldFieldsValue
        })

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

        if(status === 2)
            setGameRunning(false)
        //else
        //    setTimeout(process, 1000)
    }

    useEffect(() => process(), [])

    return (
        isGameRunning
            ?   <div key={0} className="board">
                    {fieldsValue.map((column, columnIndex) => 
                    <div className="column-wrapper">{column.map((fieldValue, rowIndex) => 
                        <Area key={(rowIndex*columnIndex + rowIndex)*1000 + fieldValue} symbolicValue={fieldValue} />)}
                    </div>
                    )}
                </div>
            : <div key={1}>Game over</div>
    )
}