import { useEffect } from "react";

const Canvas = ({text}) => {

  console.log(`text: ${text}`)

  useEffect(() => {
    const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = 'white';
    ctx.clearRect(0, 0, 200, 200);

    ctx.font = "24px Arial";
    let t = ctx.measureText(text);
    console.log(`text width: ${t.width}`);
    
    ctx.fillText(text, 100, 100);
  })
  
  return (
    <div>
      <canvas id='myCanvas' width='200px' height='200px' style={{ border: '1px solid'}}></canvas>
    </div>
  )
}

export default Canvas