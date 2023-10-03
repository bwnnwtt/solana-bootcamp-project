import Canvas from '@/components/Canvas'
import PaintingCanvas from '@/components/PaintingCanvas'
import AICanvas from '@/components/AICanvas'
import NavBar from '@/components/NavBar'
import SNSList from '@/components/SNSList'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { Metaplex, bundlrStorage, toMetaplexFile, walletAdapterIdentity } from "@metaplex-foundation/js"
import { useConnection, useWallet } from '@solana/wallet-adapter-react'


export default function Home() {

  const [text, setText] = useState('')
  const [openaiKey, setKey] = useState('')
  const { connection } = useConnection()
  const wallet = useWallet()

  function handleInputTextChange(e) {
    try{
      setText(e.target.value)
    } catch (error) {
      handleError(error)
    }
  }

  function handleOpenAIKeyChange(e) {
    try{
      setKey(e.target.value)
    } catch (error) {
      handleError(error)
    }
  }

  function handleSNSClick(e) {
    try{
      setText(e.target.value)
    } catch (error) {
      handleError(error)
    }
  }

  function handleMint(canvas) {
    try{
      const dataURL = canvas.toDataURL('image/png')

      fetch(dataURL)
        .then(res => res.arrayBuffer())
        .then(buffer => {
          console.log(`buffer: `, buffer)
          createNft(buffer)
        })
      } catch (error) {
        handleError(error)
      }
  }

  function handleError(error) {
    console.error('Error: ', error)
    if(error.name == 'UninitializedWalletAdapterError') {
      toast.error(`Please connect wallet to mint`)
    } else if (error.code == 'invalid_api_key') {
      toast.error(`Please insert a valid oppenai api key`)
    } else {
      toast.error(`Error! ${error}`)
    }
  }

  async function createNft(buffer) {
    try {
      const metaplex = Metaplex.make(connection)
                            .use(walletAdapterIdentity(wallet))
                            .use(
                              bundlrStorage({
                                address: "https://devnet.bundlr.network",
                                providerUrl: "https://api.devnet.solana.com",
                                timeout: 60000,
                              })
                            )
      const file = toMetaplexFile(buffer, "image.png")
      
      const imageUri = await metaplex.storage().upload(file)
      console.log(`imageUri: ${imageUri}`)
      const { uri } = await metaplex.nfts().uploadMetadata({
                        name: text,
                        description: "made with love from Team 1 in Encode Solana Autumn Bootcamp 2023",
                        image: imageUri,
                        properties: {
                          files: [
                            {
                              type: 'image/png',
                              uri: imageUri
                            }
                          ]
                        }
                      })
      const { nft } = await metaplex.nfts().create({
                        uri: uri,
                        name: text,
                        sellerFeeBasisPoints: 0,
                        isMutable: false
                    })
      
      let txURL = `https://explorer.solana.com/address/${nft.address}?cluster=devnet`
      console.log(`Minted NFT: https://explorer.solana.com/address/${nft.address}?cluster=devnet`)

      toast.success(
        <div>Successfully minted NFT!
          <br/>
          <a target='_blank' href={txURL} rel='noopener noreferrer'>
            <u>View Transaction</u>
          </a>
        </div>
      ) 
    } catch (error) {
      
      handleError(error)
    }
  }

  return (
    <div>
      <NavBar />
      <SNSList handleSNSClick={handleSNSClick} />
      <div className='input-container'>
        <input type='text' value={text} onChange={handleInputTextChange} placeholder='Enter text...'/>
      </div>
      <div className="grid-container">
        <Canvas text={text} handleMint={handleMint}/>
        <PaintingCanvas text={text} handleMint={handleMint} />
        <AICanvas text={text} openaiKey={openaiKey} handleOpenAIKeyChange={handleOpenAIKeyChange} handleMint={handleMint} handleError={handleError} />
      </div>
    </div>
  )
}
