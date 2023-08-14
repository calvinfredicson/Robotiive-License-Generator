import {
  Avatar,
  Box,
  Button,
  Container,
  Typography,
} from "@mui/material"
import { useCallback, useState } from "react"
import {  SubmitHandler, useForm } from "react-hook-form"
import {  UserTypeMap } from "stringTemplates"
import { LicenseType, ProductType, User } from "types"
import { LicenseDialog } from "dialogs"
import { VpnKeyOutlined } from "@material-ui/icons"
import dateFormat from "dateformat"
import { InputLicenseExpiry, InputLicenseType, InputProductType, InputUID } from "component"
import { calculateLicenseExpiryDate } from "Utils"

const LicenseGenerator: React.FC = () => {
  const { control, handleSubmit, reset } =
    useForm<License.GenerateLicense.GenerateLicense>({
      defaultValues: {
        uid: "",
        licenseExpiry: UserTypeMap[User.PARTNER].expiry,
        licenseType: LicenseType.SINGLE,
        productType: ProductType.PROFESSIONAL
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
  >(({ uid, licenseExpiry, licenseType, productType }) => {
    setDialogOpen(true)
    const licenseExpiryDate = dateFormat(
      calculateLicenseExpiryDate(licenseExpiry),
      "yyyy/mm/dd"
    )
    const url = `/cicd run license_generate -expiredDate ${licenseExpiryDate} -licenseType ${licenseType} -productType ${productType} -uid ${uid}`
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
      <Box
        component="form"
        width="100%"
        onSubmit={handleSubmit(generateQueryString)}
      >
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
          <InputProductType control={control}/>
          <InputLicenseExpiry control={control} />
          <InputLicenseType control={control} />
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

export default LicenseGenerator
