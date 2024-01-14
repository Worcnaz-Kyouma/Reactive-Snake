import { useEffect } from "react"

export default function Field({ needSync, setSyncNecessity, count, setCount }: {
    needSync: boolean,
    setSyncNecessity?: React.Dispatch<React.SetStateAction<boolean>>,
    count: number,
    setCount: React.Dispatch<React.SetStateAction<number>>
}) {
    useEffect(() => {
        if(needSync){
            setCount(oldCount => ++oldCount)
            if(typeof setSyncNecessity !== 'undefined') setSyncNecessity(false)
        }
    }, [needSync])

    return (
        <div>{count}</div>
    )
}