import { Container, Typography } from "@mui/material"
import { NextPage } from "next"

const RootPage: NextPage = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h3">License Generator</Typography>
    </Container>
  )
}

export default RootPage
