import { createTheme, ThemeProvider } from "@mui/material"
import { ManualLicenseGenerator } from "../component"

import { GetServerSidePropsContext, NextPage } from "next"

interface GenerateLicensePageProps {
  licenseString: string
}

const GenerateLicensePage: NextPage<GenerateLicensePageProps> = ({
  licenseString,
}) => {
  const theme = createTheme()
  console.log(licenseString)
  return (
    <ThemeProvider theme={theme}>
      <ManualLicenseGenerator />
    </ThemeProvider>
  )
}

export async function getServerSideProps(_ctx: GetServerSidePropsContext) {
  return {
    props: {
      licenseString: "sss",
    },
  }
}

export default GenerateLicensePage
