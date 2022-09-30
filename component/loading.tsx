import { CircularProgress, Container } from "@mui/material"

export const Loading: React.FC = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress size={50} color="primary" />
    </Container>
  )
}
