import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  createTheme,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  MenuItem,
  TextField,
  TextFieldProps,
  ThemeProvider,
  Typography,
} from "@mui/material"
import { VpnKeyOutlined } from "@material-ui/icons"
import { FormEvent, useCallback, useMemo, useState } from "react"
import type { NextPage } from "next"
import { UserTypeMap } from "../stringTemplates"
import { User } from "../types/enums"

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright ©"}
      <Link color="inherit" href="https://iscoollab.com/en/">
        IsCoolLab
      </Link>
    </Typography>
  )
}

const theme = createTheme()

const GenerateLicense: NextPage = () => {
  const [uid, setUid] = useState("")
  const [licenseExpiry, setLicenseExpiry] = useState(
    UserTypeMap[User.CUSTOMER].expiry
  )

  const onUIDChange = useCallback<NonNullable<TextFieldProps["onChange"]>>(
    (event) => {
      setUid(event.target.value)
    },
    []
  )

  const onLicenseExpiryChange = useCallback<
    NonNullable<TextFieldProps["onChange"]>
  >((event) => {
    setLicenseExpiry(+event.target.value)
  }, [])

  const licenseBuilderString = useMemo(() => {
    return `https://ops.iscooldev.com/genlicense/${uid}/2022-04-04/0/-1`
  }, [uid])

  console.log(licenseBuilderString)

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <VpnKeyOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Generate Robotiive License
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="UID"
              autoFocus
              onChange={onUIDChange}
              value={uid}
            />
            <TextField
              margin="normal"
              required
              label="License Expiry"
              fullWidth
              select
              onChange={onLicenseExpiryChange}
              value={licenseExpiry}
            >
              {Object.entries(UserTypeMap).map(([_, { type, expiry }]) => (
                <MenuItem
                  key={type}
                  value={expiry}
                >{`${type} - ${expiry} month(s)`}</MenuItem>
              ))}
            </TextField>
            <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Generate
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )
}

export default GenerateLicense
