import Head from "next/head"
import { createTheme, ThemeProvider } from "@mui/material"
import { LicenseGenerator } from "component"
import { NextPage } from "next"

const GenerateLicensePage: NextPage = () => {
  const theme = createTheme()
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Generate License</title>
      </Head>
      <LicenseGenerator />
    </ThemeProvider>
  )
}

export default GenerateLicensePage
