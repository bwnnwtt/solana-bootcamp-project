import { useEffect, useRef, useState } from 'react'

const Canvas = ({text, handleMint}) => {

  useEffect(() => {
    const canvas = document.getElementById("myCanvas") as HTMLCanvasElement
    const ctx = canvas.getContext("2d")
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillStyle = 'white'
    ctx.clearRect(0, 0, 200, 200)
    ctx.strokeStyle = 'white'
    ctx.strokeRect(0, 0, 200, 200)

    ctx.font = "24px Arial"
    
    ctx.fillText(text, 100, 100)
  })

  function convertToBuffer() {
    const c = document.getElementById("myCanvas") as HTMLCanvasElement
    handleMint(c)
  }
  
  return (
    <div>
      <canvas id='myCanvas' width='200px' height='200px' style={{ border: '1px solid'}}></canvas>
      <button onClick={convertToBuffer}>Mint</button>
    </div>
  )
}

export default Canvas