import { Box, Button, Container } from "@mui/material"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useCallback } from "react"

const appRoute = {
  licenseGeneratorWithoutRecord: "/generateLicenseWithoutRecord",
  licenseGenerator: "/generateLicense",
}

const RootPage: NextPage = () => {
  const { push } = useRouter()
  const navigateRoute = useCallback(
    (route: string) => {
      push(route)
    },
    [push]
  )
  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box display="flex" flexDirection="column" gap={2}>
        {/* <Button
          size="large"
          variant="contained"
          onClick={() => navigateRoute(appRoute.licenseGeneratorWithoutRecord)}
        >
          Generate License Without Record
        </Button> */}
        <Button
          size="large"
          variant="contained"
          color="success"
          onClick={() => navigateRoute(appRoute.licenseGenerator)}
        >
          Generate License
        </Button>
      </Box>
    </Container>
  )
}

export default RootPage
