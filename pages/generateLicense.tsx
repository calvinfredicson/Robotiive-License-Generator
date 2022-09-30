import Head from "next/head"
import { createTheme, ThemeProvider } from "@mui/material"
import { LicenseGenerator } from "component"
import { GetServerSidePropsContext, NextPage } from "next"
import { getRecordedCompanyList } from "./api/getRecordedCompanyList"

export interface GenerateLicensePageProps {
  companyList: License.GenerateLicense.RecordedCompanyList[]
}

const GenerateLicensePage: NextPage<GenerateLicensePageProps> = ({
  companyList,
}) => {
  const theme = createTheme()
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Generate License</title>
      </Head>
      <LicenseGenerator companyList={companyList} />
    </ThemeProvider>
  )
}

export async function getServerSideProps(_ctx: GetServerSidePropsContext) {
  const companyList = await getRecordedCompanyList()
  return {
    props: {
      companyList: companyList,
    },
  }
}

export default GenerateLicensePage
