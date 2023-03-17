import Head from "next/head"
import { createTheme, ThemeProvider } from "@mui/material"
import { NextPage } from "next"
import { LicenseGenerator } from 'component/licenseGenerator'

const GenerateLicense: NextPage = () => {
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

export default GenerateLicense
