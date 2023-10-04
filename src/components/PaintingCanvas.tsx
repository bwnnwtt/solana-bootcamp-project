import { useEffect } from 'react'
import { colours } from '@/Constants'
const crypto = require('crypto');

const PaintingCanvas = ({text, handleMint}) => {

  let hash

  function drawPoint(context, x, y, color) {
    let size = 4;
    if (color == null) {
      color = '#000';
    }
    var pointX = Math.round(x);
    var pointY = Math.round(y);
    context.beginPath();
    context.fillStyle = color;
    context.arc(pointX, pointY, size, 0 * Math.PI, 2 * Math.PI);
    context.fill();
  }

  function genHash() {
    hash = crypto.createHmac('sha256', text)
                 .update(text)
                 .digest('hex');
  }

  function isNumeric(n):boolean {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function getCharacterColor(pos): string {
    var charIndex:number
    let character = hash[pos-1]

    if(isNumeric(character)){
      charIndex = character
    }
    else{
      charIndex = hash.charCodeAt(pos-1) - 65
    }
    charIndex = Math.abs(charIndex)

    let colourIndex = charIndex*pos % 280

    return colours[colourIndex]
  }

  function convertToBuffer() {
    const c = document.getElementById("myPaintingCanvas") as HTMLCanvasElement
    handleMint(c)
  }

  useEffect(() => {
    const canvas = document.getElementById("myPaintingCanvas") as HTMLCanvasElement
    const ctx = canvas.getContext("2d")

    ctx.clearRect(0, 0, 275, 225)
    
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (text.trim() != "") {
      genHash()
      console.log(`hash: ${hash}`)
      let pos = 1
      for (let row = 1; row < 8; row++) {
        for (let col = 1; col < 8; col++) {
          let color = getCharacterColor(pos)
          drawPoint(ctx, col*25-2, row*25-2, color)
          pos++
        }
      }
    }
  })
  
  return (
    <div>
      <canvas id='myPaintingCanvas' width='200px' height='200px' style={{ border: '1px solid'}}></canvas>
      <button className='button' onClick={convertToBuffer}>Mint</button>
    </div>
  )
}

export default PaintingCanvas