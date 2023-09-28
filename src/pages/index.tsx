import Canvas from '@/components/Canvas'
import NavBar from '@/components/NavBar'
import { useState } from 'react'


export default function Home() {

  const [text, setText] = useState('')

  function handleInputTextChange(e) {
    setText(e.target.value)
  }

  return (
    <div>
      <NavBar />
      <input type='text' value={text} onChange={handleInputTextChange} placeholder='Enter text...'/>
      <Canvas text={text}/>
    </div>
  )
}
