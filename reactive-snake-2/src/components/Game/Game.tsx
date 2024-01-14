import { useEffect, useState } from "react"
import { rowSize, columnSize, APPLE, TOP, RIGHT, DOWN, LEFT, RIGHT_DIRECTION } from "../../constants"
import Board from "../Board/Board"
import { getNewAppleField } from "../../utils"

export default function Game() {
    const firstHeadField = getFirstHeadField()
    const [ snakeData, setSnakeData ] = useState({
        length: 1,
        headField: firstHeadField
    })
    const [ boardValues, setBoardValues ] = useState<number[][]>(getFirstBoardValues(firstHeadField))
    const [ gameStatus, setGameStatus ] = useState(1)
    const [ movementVector, setMovementVector ] = useState(RIGHT)
    const [ directionVector, setDirectionVector ] = useState(RIGHT_DIRECTION)
    const [ needSync, setSyncNecessity ] = useState(false)
    const [ isAppleEated, setAppleEated ] = useState(false)

    function getFirstHeadField() {
        const headField = {
            x: Math.floor(Math.random() * rowSize), 
            y: Math.floor(Math.random() * columnSize)
        }
        
        return headField
    }

    function getFirstBoardValues(firstHeadField:{ x: number, y:number }) {
        const firstBoardValues = Array.from<number[], number[]>(
            { length: columnSize }, () => Array.from<number>(
            { length: rowSize }).fill(0)
        )
        firstBoardValues[firstHeadField.x][firstHeadField.y] = 1

        const newApple = getNewAppleField(firstBoardValues)
        firstBoardValues[newApple.x][newApple.y] = APPLE

        return firstBoardValues
    }

    function changeMovementVector(newMovementVector: {
        x: number, y: number
    }) {
        setMovementVector(newMovementVector)
    }

    useEffect(() => {
        function handleKeyPress(event:KeyboardEvent) {
            const vectorMap: { [key: string]: { x:number, y:number } } = {
                'ArrowUp':      TOP,
                'ArrowRight':   RIGHT,
                'ArrowDown':    DOWN,
                'ArrowLeft':    LEFT
            }
            const codeVectorMap = new Map<{x:number, y:number}, number>([
                [TOP, 0],
                [RIGHT, 1],
                [DOWN, 2],
                [LEFT, 3]
              ]);

            if(['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].includes(event.key)){
                const newDirectionCode = codeVectorMap.get(vectorMap[event.key])!

                if(typeof vectorMap[event.key] !== 'undefined' && (snakeData.length === 1 || Math.abs(newDirectionCode - directionVector) !== 2))
                    changeMovementVector(vectorMap[event.key])
            }
        }

        document.addEventListener('keydown', handleKeyPress);
    
        return () => {
          document.removeEventListener('keydown', handleKeyPress);
        };
      }, [movementVector, snakeData, directionVector]);

    return (
        <Board 
            snakeData={snakeData} 
            setSnakeData={setSnakeData} 

            boardValues={boardValues} 
            setBoardValues={setBoardValues} 

            gameStatus={gameStatus} 
            setGameStatus={setGameStatus} 

            movementVector={movementVector} 

            needSync={needSync} 
            setSyncNecessity={setSyncNecessity} 

            isAppleEated={isAppleEated}
            setAppleEated={setAppleEated}

            setDirectionVector={setDirectionVector}
        />
    )
}