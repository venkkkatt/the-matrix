import { useState } from "react"
import {v4 as uuidv4} from "uuid";
export default function Emoji() {
    const [emojis, setEmojis] = useState([{id: uuidv4(), emoji:"🚶"}]);
    const changeEmoji = () => {
        setEmojis((oldEmojis) => [...oldEmojis, {id: uuidv4(), emoji:"❌"}])
    }
    const deleteEmoji = (id) => {
        
        setEmojis((prevEmojis) => {return prevEmojis.filter(e => e.id !== id)});
    }
  return (
    <div>
        {emojis.map((e) => (
            <span style={{cursor: 'pointer'}} onClick={() => deleteEmoji(e.id)} key={e.id}>{e.emoji}</span>
            
        )
        )}
        <button onClick={changeEmoji}>ADD</button>
       
    </div>
  )
}
