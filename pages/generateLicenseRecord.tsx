import Head from "next/head"
import { createTheme, ThemeProvider } from "@mui/material"
import { RecordGenerator } from "component"
import { NextPage } from "next"

const GenerateRecord: NextPage = () => {
  const theme = createTheme()
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Generate Record</title>
      </Head>
      <RecordGenerator />
    </ThemeProvider>
  )
}

export default GenerateRecord
