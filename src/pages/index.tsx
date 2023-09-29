import Canvas from '@/components/Canvas'
import PaintingCanvas from '@/components/PaintingCanvas'
import NavBar from '@/components/NavBar'
import SNSList from '@/components/SNSList'
import { useState } from 'react'
import { Metaplex, bundlrStorage, toMetaplexFile, walletAdapterIdentity } from "@metaplex-foundation/js";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';


export default function Home() {

  const [text, setText] = useState('')
  const { connection } = useConnection()
  const wallet = useWallet()

  function handleInputTextChange(e) {
    setText(e.target.value)
  }

  function handleSNSClick(e) {
    setText(e.target.value)
  }

  function handleMint(canvas) {
    const dataURL = canvas.toDataURL('image/png')

    fetch(dataURL)
      .then(res => res.arrayBuffer())
      .then(buffer => {
        console.log(`buffer: `, buffer)
        createNft(buffer)
      })
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
                    });
      
      console.log(`Minted NFT: https://explorer.solana.com/address/${nft.address}?cluster=devnet`)
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  return (
    <div>
      <NavBar />
      <SNSList handleSNSClick={handleSNSClick} />
      <div>
        <input type='text' value={text} onChange={handleInputTextChange} placeholder='Enter text...'/>
      </div>
      <div className="grid-container">
        <Canvas text={text} handleMint={handleMint}/>
        <PaintingCanvas text={text} name={text} handleMint={handleMint} />
      </div>
    </div>
  )
}
