import {AppProps} from 'next/app'
import { Header } from '../Components/Header/Index';
import {SessionProvider} from 'next-auth/react'
import '../styles/global.scss';

function MyApp({ Component, pageProps }:AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
    <Header />
  <Component {...pageProps} />
  </SessionProvider>
  )
}

export default MyApp
