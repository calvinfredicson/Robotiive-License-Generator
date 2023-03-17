import { Avatar, Box, Button, Container, MenuItem, TextField, Typography } from "@mui/material"
import { useCallback, useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { LicenseTypeMap, UserTypeMap } from "stringTemplates"
import {
  InputComponentType,
  InputLicenseExpiry,
  InputUID,
} from "component/inputs"
import { LicenseType, User } from "types"
import { LicenseDialog } from "dialogs"
import { VpnKeyOutlined } from "@material-ui/icons"
import dateFormat from 'dateformat'
import { calculateLicenseExpiryDate, convertComponentType } from 'Utils'

export const LicenseGenerator: React.FC = () => {
  const { control, handleSubmit, reset } =
    useForm<License.GenerateLicense.GenerateLicense>({
      defaultValues: {
        uid: "",
        licenseExpiry: UserTypeMap[User.PARTNER].expiry,
        componentType: [],
        licenseType: LicenseType.SINGLE,
      },
    })
  const [dialogOpen, setDialogOpen] = useState(false)
  const handleReset = useCallback(() => reset(), [reset])
  const handleDialogClose = useCallback(() => {
    setDialogOpen(false)
    handleReset()
  }, [handleReset])
  const [queryString, setQueryString] = useState("")
  const generateQueryString = useCallback<
    SubmitHandler<License.GenerateLicense.GenerateLicense>
  >(async ({ uid, licenseExpiry, licenseType, componentType }) => {
    if (!componentType.length) {
      window.alert("Please choose component Type")
      return
    }
    setDialogOpen(true)
    const licenseExpiryDate = dateFormat(
      calculateLicenseExpiryDate(licenseExpiry),
      "yyyy/mm/dd"
    )
    const url = `/cicd run license_generate -uid ${uid} -expiredDate ${licenseExpiryDate} -licenseType ${licenseType} -componentType ${convertComponentType(componentType)}`
    setQueryString(url)
  }, [])

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
      <Box component="form" width="100%" onSubmit={handleSubmit(generateQueryString)}>
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
              License Generator
            </Typography>
          </Box>
          <InputUID control={control} />
          <InputLicenseExpiry control={control} />
          <InputComponentType control={control} />
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
          <LicenseDialog
            open={dialogOpen}
            displayContent={queryString}
            handleDialogClose={handleDialogClose}

          />
        </Box>
      </Box>
    </Container>
  )
}
