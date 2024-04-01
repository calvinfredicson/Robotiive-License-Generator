import { auth } from 'firebase'
import type { AppProps } from "next/app"
import { useAuthState } from "react-firebase-hooks/auth"
import Auth from './auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { getAuth, signOut } from 'firebase/auth'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Log user out on close
    const handleBeforeUnload = async () => {
      const auth = getAuth()
      signOut(auth)
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [])
  const { asPath } = useRouter()
  const [user] = useAuthState(auth)
  if (!user?.email) return <Auth redirectUrl={asPath} />
  else return <Component {...pageProps} />
}

export default MyApp
