import WalletContextProvider from '@/components/WalletContextProvider'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WalletContextProvider>
      <Component {...pageProps} />
      <ToastContainer 
          position='bottom-right'
          autoClose={10000}
          theme='dark'
          toastStyle={{ backgroundColor: '#1c1c1c'}}
        />
    </WalletContextProvider>
  )
}
