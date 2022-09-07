import {
  AutocompleteProps,
  Avatar,
  Box,
  Button,
  Container,
  MenuItem,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material"
import { VpnKeyOutlined } from "@material-ui/icons"
import { useCallback, useMemo, useState } from "react"
import {
  ComponentTypeMap,
  LicenseTypeMap,
  UserTypeMap,
} from "../stringTemplates"
import {
  LicenseRequestParameters,
  License,
  User,
  LicenseType,
  ComponentType,
} from "../types"
import dateFormat from "dateformat"
import { fetchJson } from "../Utils"
import { ComponentTypeInput } from "."

export const LicenseGenerator = () => {
  const [uid, setUid] = useState("")
  const [licenseExpiry, setLicenseExpiry] = useState(
    UserTypeMap[User.PARTNER].expiry
  )
  const [componentType, setComponentType] = useState<string[]>([])
  const [licenseType, setLicenseType] = useState(LicenseType.SINGLE)

  const doReset = useCallback(() => {
    setUid("")
    setLicenseExpiry(UserTypeMap[User.PARTNER].expiry)
    setComponentType([])
    setLicenseType(LicenseType.SINGLE)
  }, [])

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

  const convertToComponentTypeCode = useCallback((componentType: string[]) => {
    const componentTypeList: string[] = []
    componentType.forEach((type) => {
      const componentTypeId = Object.keys(ComponentTypeMap).find(
        (typeCode) =>
          ComponentTypeMap[typeCode as unknown as ComponentType] === type
      )
      if (componentTypeId) {
        componentTypeList.push(componentTypeId)
      }
    })
    return componentTypeList.toString()
  }, [])

  const licenseExpiryDate = useMemo(() => {
    if (!licenseExpiry) return
    return dateFormat(
      new Date(new Date().setMonth(new Date().getMonth() + licenseExpiry)),
      "yyyy-mm-dd"
    )
  }, [licenseExpiry])

  const doGenerateLicense = useCallback(async () => {
    if (!uid || !licenseExpiryDate || !componentType.length) {
      window.alert("Please fill all field!")
      return
    }
    const url = "/api/generateLicense"
    const response = await fetchJson<LicenseRequestParameters, License>(
      url,
      "POST",
      {
        uid: uid,
        licenseExpiryDate: licenseExpiryDate,
        licenseType: licenseType,
        componentType: convertToComponentTypeCode(componentType),
      }
    )
    if (!response.data) return
    await navigator.clipboard.writeText(
      `UID:\n${uid}\n\nLicense:\n${response.data.license}`
    )
    window.alert(
      "Your license is successfully generated and copied to your clipboard"
    )
  }, [
    componentType,
    convertToComponentTypeCode,
    licenseExpiryDate,
    licenseType,
    uid,
  ])

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
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar sx={{ padding: 1, margin: 2, bgcolor: "secondary.main" }}>
          <VpnKeyOutlined fontSize="large" />
        </Avatar>
        <Typography variant="h4" textAlign="center" sx={{ mt: 1, mb: 3 }}>
          Generate Robotiive License
        </Typography>
        <Box display="flex" flexDirection="column" gap={3} width="100%">
          <TextField
            required
            fullWidth
            label="UID"
            autoFocus
            onChange={onUIDChange}
            value={uid}
          />
          <TextField
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
          <Box display="flex" flexDirection="column" gap={1}>
            <Button
              onClick={doGenerateLicense}
              fullWidth
              variant="contained"
              size="large"
            >
              Generate
            </Button>
            <Button
              onClick={doReset}
              fullWidth
              variant="contained"
              color="error"
              size="large"
            >
              Reset
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
