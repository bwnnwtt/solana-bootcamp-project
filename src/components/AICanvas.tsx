import { useEffect } from 'react'
import { Configuration, OpenAIApi } from "openai"
import { subjects, verbs, places } from '@/Constants'
const crypto = require('crypto')

const AICanvas = ({text, openaiKey, handleOpenAIKeyChange, handleMint, handleError}) => {

  let hash=""
  let nftPrompt = ""
  let configuration
  let openai
  let imgLoading

  function initializeLoading(){
    if (!imgLoading) {
      imgLoading = new Image
      imgLoading.src = "/assets/images/loading1.png"
      imgLoading.width = 20
      imgLoading.height = 20
    }
  }

  function openaiKeyChange(e) {
    handleOpenAIKeyChange(e)
  }

  function forwardError(err) {
    handleError(err)
  }

  function convertToBuffer() {
    const c = document.getElementById("myAICanvas") as HTMLCanvasElement
    handleMint(c)
  }

  function genHash() {
    hash = crypto.createHmac('sha256', text)
                 .update(text)
                 .digest('hex');
  }

  function isNumeric(n:any):boolean {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function getIndexFromCharacter(character:any, arrayLen:number):number {
    let charIndex:number

    if(isNumeric(character)){
      charIndex = character
    }
    else{
      charIndex = hash.charCodeAt(0) - 65
    }

    return Math.abs(charIndex % arrayLen)
  }

  function genPrompt() {
    let charIndex:number

    charIndex = getIndexFromCharacter(hash[0], subjects.length)
    nftPrompt = subjects[charIndex % subjects.length]

    charIndex = getIndexFromCharacter(hash[1], verbs.length)
    nftPrompt += ' ' + verbs[charIndex % verbs.length]

    charIndex = getIndexFromCharacter(hash[2], places.length)
    nftPrompt += ' ' + places[charIndex % places.length]

    console.log(`nftPrompt: ${nftPrompt}`)
  }

  const instantiateOpenAI = () => {
    configuration = new Configuration({
      organization: "org-kOZUtYtFMFEjgtiibAccIQjw",
      apiKey: openaiKey,
    })

    configuration.baseOptions.headers = {
      Authorization: "Bearer " + openaiKey,
    }

    delete configuration.baseOptions.headers['User-Agent'];
    openai = new OpenAIApi(configuration)
  }

  const fetchImageUrl = async (ctx, canvas) => {
    try {
      const imageParameters = {
        prompt: nftPrompt,
        n: 1,
        size: "256x256",
        response_format: "b64_json",
      }
      const resp = await openai.createImage(imageParameters)
      const b64image = resp.data.data[0].b64_json
      console.log(`generated image: ${b64image}`)

      return b64image

    } catch (error) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (error.response) {
        console.log(error.response.status)
        console.log(error.response.data)
        forwardError(error.response.data.error)
      } else {
        console.log(error.message)
        forwardError(error)
      }
    }
  }
  
  useEffect(() => {
    initializeLoading()
    const canvas = document.getElementById("myAICanvas") as HTMLCanvasElement
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (text.trim() != "" && openaiKey.trim() != "") {
      ctx.drawImage(imgLoading,90,90,20,20)
      
      genHash()
      genPrompt()
      
      instantiateOpenAI()

      fetchImageUrl(ctx, canvas).then(function(generatedImage) { 
        var img = new Image;
        img.onload = function(){
          ctx.drawImage(img,0,0)
        };
        img.src = "data:image/png;base64, " + generatedImage
      })
    }
  })
  
  return (
    <div onLoad={initializeLoading}>
      <input type='password' value={openaiKey} onChange={openaiKeyChange} placeholder='Enter your OpenAI Key...' width='200px'/>
      <canvas id='myAICanvas' width='200px' height='200px' style={{ border: '1px solid'}}></canvas>
      <button className='button' onClick={convertToBuffer}>Mint</button>
    </div>
  )
}

export default AICanvas