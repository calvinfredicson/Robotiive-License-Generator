import Head from "next/head"
import { createTheme, ThemeProvider } from "@mui/material"
import { ManualLicenseGenerator } from "../component"
import { NextPage } from "next"

const ManualGenerate: NextPage = () => {
  const theme = createTheme()
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Manual Generate License</title>
      </Head>
      <ManualLicenseGenerator />
    </ThemeProvider>
  )
}

export default ManualGenerate
