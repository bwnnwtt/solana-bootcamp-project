import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import dynamic from 'next/dynamic'

const WalletMultiButtonDynamic = dynamic(
  async () => 
    await WalletMultiButton,
    { ssr: false }
)

const NavBar = () => {
  return (
    <div>
      <WalletMultiButtonDynamic />
    </div>
  )
}

export default NavBar