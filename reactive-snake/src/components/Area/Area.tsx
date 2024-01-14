import "./Area.css"

export default function Area({ symbolicValue }: {
    symbolicValue:number
}){
    function defineType(symbolicValue:number) {
        if(symbolicValue<1)
            return "empty"
        if(symbolicValue === 14488883)
            return "apple"
        return "snake"
    }

    return (
        <div className={`field ${defineType(symbolicValue)}`}></div>
    )
}  