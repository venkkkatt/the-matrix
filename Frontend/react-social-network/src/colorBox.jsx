import { useState } from "react"
export default function ColorBox() {

    const [color, setColor] = useState("aqua");
    const changeColor = () => {
        setColor("red");
    }
   return (
    <div onClick={changeColor} className="colorBox" style={{backgroundColor: color}}>

    </div>
  )
}
