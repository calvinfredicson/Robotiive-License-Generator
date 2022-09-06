import { createTheme, ThemeProvider } from "@mui/material"
import { LicenseGenerator } from "../component"
import { NextPage } from "next"

const theme = createTheme()

const GenerateLicense: NextPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <LicenseGenerator />
    </ThemeProvider>
  )
}

export default GenerateLicense
