import Canvas from '@/components/Canvas'
import HirstCanvas from '@/components/HirstCanvas'
import NavBar from '@/components/NavBar'
import SNSList from '@/components/SNSList'
import { useState } from 'react'


export default function Home() {

  const [text, setText] = useState('')
  const [domain, setDomain] = useState('')

  function handleInputTextChange(e) {
    setText(e.target.value)
  }

  function handleSNSClick(e) {
    let val = e.target.value.slice(0, e.target.value.length - 4)
    setDomain(e.target.value)
    setText(val)
  }

  const [name, setName] = useState('')

  function handleInputNameChange(e) {
    setName(e.target.value)
  }


  return (
    <div>
      <NavBar />
      <SNSList handleSNSClick={handleSNSClick} />
      <div>
        <input type='text' value={text} onChange={handleInputTextChange} placeholder='Enter text...'/>
        <input type='text' value={name} onChange={handleInputNameChange} placeholder='Enter your name...'/>
      </div>
      <Canvas text={text}/>
      <HirstCanvas text={domain} name={name} />
    </div>
  )
}
