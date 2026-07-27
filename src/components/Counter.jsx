import Button from "./Button"
import { useState } from "react"

function Counter() {  
    const [count, setCount] = useState(0)
    return (
        <div>
            <p>{count}</p>
            <Button styles={{ backgroundColor: 'Green', padding: 10 }}
            handleClick={()=>setCount(count +1)}
            >
            sumar</Button>
            <Button styles={{backgroundColor: 'Red', padding: 10}}
            handleClick={()=>setCount(count -1)}
            >
                restar</Button>

        </div>
    )
}

export default Counter