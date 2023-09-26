import Canvas from '@/components/canvas'
import { useState } from 'react'


export default function Home() {

  const [text, setText] = useState('')

  function handleInputTextChange(e) {
    setText(e.target.value)
  }

  return (
    <div>
      <input type='text' value={text} onChange={handleInputTextChange} placeholder='Enter text...'/>
      <Canvas text={text}/>
    </div>
  )
}
