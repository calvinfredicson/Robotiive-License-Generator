import "../styles/globals.css"
import Auth from "./auth"
import Head from "next/head"
import type { AppProps } from "next/app"
import { auth } from "firebase"
import { useEffect, useMemo } from "react"
import { useAuthState, useDeleteUser, useSignOut } from "react-firebase-hooks/auth"
import { ThemeProvider } from "styled-components"
import { createTheme } from "@mui/material"
import { isValidEmail } from 'Utils'
import CustomSnackbar from 'component/customSnackbar'
import { useAlert } from 'customHook'

function MyApp({ Component, pageProps }: AppProps) {
  const theme = createTheme()
  const [user] = useAuthState(auth)
  const [signOut] = useSignOut(auth)
  const [deleteUser] = useDeleteUser(auth)
  const { showAlert, ...alertErrorProps } = useAlert()

  const userEmail = useMemo(() => user?.email ? user.email : "", [user])
  const showAuth = useMemo(() => !(userEmail.length > 0), [userEmail])

  useEffect(() => {
    const validEmail = isValidEmail(userEmail)
    if (validEmail) return
    signOut()
    deleteUser()
    showAlert()
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
      <CustomSnackbar text="Sorry, but you are not authorized user" type="error" {...alertErrorProps} />
    </>
  )
}

export default MyApp
