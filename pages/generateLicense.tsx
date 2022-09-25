import { createTheme, ThemeProvider } from "@mui/material"
import { LicenseGenerator } from "../component"
import { GetServerSidePropsContext, NextPage } from "next"
import { CompanyList } from "../Utils/types"

export interface GenerateLicensePageProps {
  companyList: CompanyList[]
}

const GenerateLicensePage: NextPage<GenerateLicensePageProps> = ({
  companyList,
}) => {
  const theme = createTheme()
  return (
    <ThemeProvider theme={theme}>
      <LicenseGenerator companyList={companyList} />
    </ThemeProvider>
  )
}

export async function getServerSideProps(_ctx: GetServerSidePropsContext) {
  return {
    props: {
      companyList: [
        {
          "Company Name": "詮鼎",
          Type: "Partner",
        },
        {
          "Company Name": "Eastek ",
          Type: "Partner",
        },
        {
          "Company Name": "Tainet",
          Type: "Partner",
        },
        {
          "Company Name": "和泰",
          Type: "Customer/Client",
        },
        {
          "Company Name": "聯合發行",
          Type: "Customer/Client",
        },
        {
          "Company Name": "simBridge",
          Type: "Partner",
        },
        {
          "Company Name": "Hitachi",
          Type: "Partner",
        },
        {
          "Company Name": "承啟科技",
          Type: "Partner",
        },
      ],
    },
  }
}

export default GenerateLicensePage
