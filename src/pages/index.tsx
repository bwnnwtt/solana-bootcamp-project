import Canvas from '@/components/Canvas'
import NavBar from '@/components/NavBar'
import SNSList from '@/components/SNSList'
import { useState } from 'react'


export default function Home() {

  const [text, setText] = useState('')

  function handleInputTextChange(e) {
    setText(e.target.value)
  }

  function handleSNSClick(e) {
    let val = e.target.value.slice(0, e.target.value.length - 4)
    setText(val)
  }

  return (
    <div>
      <NavBar />
      <SNSList handleSNSClick={handleSNSClick} />
      <div>
        <input type='text' value={text} onChange={handleInputTextChange} placeholder='Enter text...'/>
      </div>
      <Canvas text={text}/>
    </div>
  )
}
