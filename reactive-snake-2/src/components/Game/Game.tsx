import { useEffect, useState } from "react"
import Field from "../Field/Field"

export default function Game() {
    const [ needSync, setSyncNecessity ] = useState(false)
    const [ count, setCount ] = useState(0)

    useEffect(() => {
        if(!needSync)
            setTimeout(() => {
                setSyncNecessity(true)
            }, 1000)
    }, [needSync])
    
    return (
        <>
            <Field needSync={needSync} count={count} setCount={setCount}/>
            <Field needSync={needSync} setSyncNecessity={setSyncNecessity} count={count} setCount={setCount}/>
        </>
    )
}