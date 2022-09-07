import { createTheme, ThemeProvider } from "@mui/material"
import { LicenseGenerator } from "../component"
import { NextPage } from "next"

const GenerateLicense: NextPage = () => {
  const theme = createTheme()
  return (
    <ThemeProvider theme={theme}>
      <LicenseGenerator />
    </ThemeProvider>
  )
}

export default GenerateLicense
