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
      <Box component="form" width="100%" onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={3} width="100%">
          <Box
            display="flex"
            flexDirection="column"
            gap={1}
            justifyContent="center"
            alignItems="center"
          >
            <Avatar sx={{ padding: 1, margin: 1, bgcolor: "secondary.main" }}>
              <VpnKeyOutlined fontSize="large" />
            </Avatar>
            <Typography variant="h4" textAlign="center">
              {title}
            </Typography>
          </Box>
          {children}
        </Box>
      </Box>
    </Container>
  )
}
