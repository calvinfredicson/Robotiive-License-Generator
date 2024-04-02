import "../styles/globals.css"
import Auth from "./auth"
import Head from "next/head"
import { auth } from "firebase"
import { useEffect } from "react"
import { useAuthState, useSignOut } from "react-firebase-hooks/auth"
import type { AppProps } from "next/app"
import { ThemeProvider } from "styled-components"
import { createTheme } from '@mui/material'

function MyApp({ Component, pageProps }: AppProps) {
  const theme = createTheme()
  const [user] = useAuthState(auth)
  const [signOut] = useSignOut(auth)

  useEffect(() => {
    // Log user out on close
    const handleBeforeUnload = async () => {
      signOut()
    }
    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Robotiive License</title>
      </Head>
      <ThemeProvider theme={theme}>
        <Auth showAuth={!user?.email} />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp
