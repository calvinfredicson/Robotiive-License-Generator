import { VpnKeyOutlined } from "@material-ui/icons"
import { Avatar, Box, Container, Typography } from "@mui/material"
import type { FormEventHandler, PropsWithChildren } from "react"

interface GeneratorWrapperProps extends PropsWithChildren {
  title: string
  handleSubmit?: FormEventHandler<HTMLFormElement>
}

export const GeneratorWrapper: React.FC<GeneratorWrapperProps> = ({
  children,
  title,
  handleSubmit,
}) => {
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        alignItems="center"
        onSubmit={handleSubmit}
      >
        <Avatar sx={{ padding: 1, margin: 2, bgcolor: "secondary.main" }}>
          <VpnKeyOutlined fontSize="large" />
        </Avatar>
        <Typography variant="h4" textAlign="center" sx={{ mt: 1, mb: 3 }}>
          {title}
        </Typography>
        {children}
      </Box>
    </Container>
  )
}
