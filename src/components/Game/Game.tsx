import { useEffect, useState } from "react"
import Board from "../Board/Board"

export default function Game() {
    /*movementDirections*/
    const TOP = 0
    const RIGHT = 1
    const BOTTOM = 2
    const LEFT = 3
    /** */

    const [ gameStatus, setGameStatus ] = useState(1)
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

    const [ movementVector, setMovementVector ] = useState({x: 1, y: 0}) 
    const [ movementDirection, setMovementDirection ] = useState(RIGHT)

    const [ fieldsValue, setFieldsValue ] = useState<number[][]>(defaultBoard)

    function changeMovementVector(newMovementVector: {
        x: number, y: number
    }, newDirection:number) {
        setMovementVector(newMovementVector)
        setMovementDirection(newDirection)
    }

    useEffect(() => {
        function handleKeyPress(event:KeyboardEvent) {
            const vectorMap: { [key: string]: { x: number; y: number } } = {
                'ArrowUp':      {x: 0, y: -1},
                'ArrowRight':   {x: 1, y: 0},
                'ArrowDown':    {x: 0, y: 1},
                'ArrowLeft':    {x: -1, y: 0}
            }
            const directionMap: { [key: string]: number } = {
                'ArrowUp':      TOP,
                'ArrowRight':   RIGHT,
                'ArrowDown':    BOTTOM,
                'ArrowLeft':    LEFT
            }

            if(typeof vectorMap[event.key] !== 'undefined' && (snakeData.length == 1 || Math.abs(directionMap[event.key] - movementDirection) !== 2))
                changeMovementVector(vectorMap[event.key], directionMap[event.key])
        }
        // Add event listener when component mounts
        document.addEventListener('keydown', handleKeyPress);
    
        // Remove event listener when component unmounts
        return () => {
          document.removeEventListener('keydown', handleKeyPress);
        };
      }, []);

    return <Board 
        rowSize={rowSize}
        columnSize={columnSize}        

        gameStatus={gameStatus} 
        setGameStatus={setGameStatus}

        snakeData={snakeData} 
        setSnakeData={setSnakeData} 

        movementVector={movementVector} 
        setMovementVector={setMovementVector}
        
        fieldsValue={fieldsValue}
        setFieldsValue={setFieldsValue}
    />
}