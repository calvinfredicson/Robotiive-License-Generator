import Head from "next/head"
import { createTheme, ThemeProvider } from "@mui/material"
import { NextPage } from "next"
import { LicenseGeneratorWithoutRecord } from "component"

const ManualGenerate: NextPage = () => {
  const theme = createTheme()
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Generate License Without Record</title>
      </Head>
      <LicenseGeneratorWithoutRecord />
    </ThemeProvider>
  )
}

export default ManualGenerate
