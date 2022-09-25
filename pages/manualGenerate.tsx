import { createTheme, ThemeProvider } from "@mui/material"
import { ManualLicenseGenerator } from "../component"
import { NextPage } from "next"

const ManualGenerate: NextPage = () => {
  const theme = createTheme()
  return (
    <ThemeProvider theme={theme}>
      <ManualLicenseGenerator />
    </ThemeProvider>
  )
}

export default ManualGenerate
