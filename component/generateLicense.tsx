import {
  Avatar,
  Box,
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material"
import { VpnKeyOutlined } from "@material-ui/icons"
import { useCallback } from "react"
import { LicenseTypeMap, UserTypeMap } from "../stringTemplates"
import {
  LicenseRequestParameters,
  License,
  User,
  LicenseType,
  LicenseGeneratorInfo,
} from "../types"
import { convertComponentType, convertLicenseExpiry, fetchJson } from "../Utils"
import { ComponentTypeInput } from "."
import { Controller, SubmitHandler, useForm } from "react-hook-form"

export const LicenseGenerator = () => {
  const { control, handleSubmit, reset } = useForm<LicenseGeneratorInfo>({
    defaultValues: {
      uid: "",
      licenseExpiry: UserTypeMap[User.PARTNER].expiry,
      componentType: [],
      licenseType: LicenseType.SINGLE,
    },
  })

  const generateLicense = useCallback<SubmitHandler<LicenseGeneratorInfo>>(
    async ({ uid, licenseExpiry, licenseType, componentType }) => {
      if (!componentType.length) {
        window.alert("Please choose component Type")
        return
      }
      const url = "/api/generateLicense"
      const response = await fetchJson<LicenseRequestParameters, License>(
        url,
        "POST",
        {
          uid: uid,
          licenseExpiryDate: convertLicenseExpiry(licenseExpiry),
          licenseType: licenseType.toString(),
          componentType: convertComponentType(componentType),
        }
      )
      if (!response.data) return
      await navigator.clipboard.writeText(
        `UID:\n${uid}\n\nLicense:\n${response.data.license}`
      )
      reset()
      window.alert(
        "Your license is successfully generated and copied to your clipboard"
      )
    },
    [reset]
  )

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
        onSubmit={handleSubmit(generateLicense)}
      >
        <Avatar sx={{ padding: 1, margin: 2, bgcolor: "secondary.main" }}>
          <VpnKeyOutlined fontSize="large" />
        </Avatar>
        <Typography variant="h4" textAlign="center" sx={{ mt: 1, mb: 3 }}>
          Generate Robotiive License
        </Typography>
        <Box display="flex" flexDirection="column" gap={3} width="100%">
          <Controller
            render={({ field }) => (
              <TextField {...field} required fullWidth label="UID" autoFocus />
            )}
            name="uid"
            control={control}
          />
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="License Expiry"
                fullWidth
                select
              >
                {Object.entries(UserTypeMap).map(([_, { type, expiry }]) => (
                  <MenuItem
                    key={type}
                    value={expiry}
                  >{`${type} - ${expiry} month(s)`}</MenuItem>
                ))}
              </TextField>
            )}
            name="licenseExpiry"
            control={control}
          />
          <Controller
            render={({ field }) => <ComponentTypeInput {...field} />}
            name="componentType"
            control={control}
          />
          <Controller
            render={({ field }) => (
              <TextField {...field} label="License Type" fullWidth select>
                {Object.entries(LicenseTypeMap).map(([licenseType, value]) => (
                  <MenuItem key={licenseType} value={licenseType}>
                    {value}
                  </MenuItem>
                ))}
              </TextField>
            )}
            name="licenseType"
            control={control}
          />
          <Box display="flex" flexDirection="column" gap={1}>
            <Button type="submit" fullWidth variant="contained" size="large">
              Generate
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
