import "../styles/globals.css"
import Auth from "./auth"
import Head from "next/head"
import { auth } from "firebase"
import { useEffect, useMemo } from "react"
import { useAuthState, useDeleteUser, useSignOut } from "react-firebase-hooks/auth"
import type { AppProps } from "next/app"
import { ThemeProvider } from "styled-components"
import { createTheme } from "@mui/material"
import { isValidEmail } from 'Utils'

function MyApp({ Component, pageProps }: AppProps) {
  const theme = createTheme()
  const [user] = useAuthState(auth)
  const [signOut] = useSignOut(auth)
  const [deleteUser] = useDeleteUser(auth)

  const userEmail = useMemo(() => user?.email ? user.email : "", [user])
  const showAuth = useMemo(() => !(userEmail.length > 0), [userEmail])

  useEffect(() => {
    const validEmail = isValidEmail(userEmail)
    if (validEmail) return
    signOut()
    deleteUser()
    window.alert("Sorry, but you are not authorized user")
  }, [userEmail])

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
        <Auth showAuth={showAuth} />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp
