import {
  AutocompleteProps,
  Avatar,
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Link,
  MenuItem,
  TextField,
  TextFieldProps,
  ThemeProvider,
  Typography,
} from "@mui/material"
import { VpnKeyOutlined } from "@material-ui/icons"
import { useCallback, useMemo, useState } from "react"
import type { NextPage } from "next"
import { LicenseTypeMap, UserTypeMap } from "../stringTemplates"
import { LicenseType, LicenseRequestParameters, User, License } from "../types"
import dateFormat from "dateformat"
import { fetchJson } from "../Utils"
import { ComponentTypeInput } from "../component"

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
  const [componentType, setComponentType] = useState<string[]>([])
  const [licenseType, setLicenseType] = useState(LicenseType.SINGLE)

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

  const onComponentTypeChange = useCallback<
    NonNullable<AutocompleteProps<string, true, true, any>["onChange"]>
  >((_, value, reason) => {
    if (reason !== "selectOption" && reason !== "removeOption") return
    setComponentType(value)
  }, [])

  const clearSelectedComponentType = useCallback(() => {
    setComponentType([])
  }, [])

  const onLicenseTypeChange = useCallback<
    NonNullable<TextFieldProps["onChange"]>
  >((event) => {
    setLicenseType(+event.target.value)
  }, [])

  const licenseExpiryDate = useMemo(() => {
    return dateFormat(
      new Date(
        new Date().setFullYear(new Date().getFullYear() + licenseExpiry)
      ),
      "yyyy-mm-dd"
    )
  }, [licenseExpiry])

  const doGenerateLicense = useCallback(async () => {
    if (!componentType.length) {
      window.alert("Please fill all field!")
      return
    }
    const url = "http://localhost:3000/api/generateLicense"
    const response = await fetchJson<LicenseRequestParameters, License>(
      url,
      "POST",
      {
        uid: uid,
        licenseExpiryDate: licenseExpiryDate,
        licenseType: licenseType,
        componentType: componentType.toString(),
      }
    )
    if (!response.data) return
    window.alert(response.data.license)
  }, [componentType, licenseExpiryDate, licenseType, uid])

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
            <ComponentTypeInput
              value={componentType}
              onChange={onComponentTypeChange}
              clearInput={clearSelectedComponentType}
            />
            <TextField
              margin="normal"
              required
              label="License Type"
              fullWidth
              select
              onChange={onLicenseTypeChange}
              value={licenseType}
            >
              {Object.entries(LicenseTypeMap).map(([licenseType, value]) => (
                <MenuItem key={licenseType} value={licenseType}>
                  {value}
                </MenuItem>
              ))}
            </TextField>
            <Button
              onClick={doGenerateLicense}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
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
