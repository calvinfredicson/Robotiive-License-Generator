import { Avatar, Box, Button, CircularProgress, Container, Typography } from "@mui/material"
import { useCallback, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { UserTypeMap } from "stringTemplates"
import { LicenseType, ProductType, User } from "types"
import { VpnKeyOutlined } from "@material-ui/icons"
import dateFormat from "dateformat"
import {
  InputLicenseExpiry,
  InputLicenseType,
  InputProductType,
  CustomTextInput,
} from "component"
import { calculateLicenseExpiryDate, customFetch, trimDoubleQuotes } from "Utils"
import { useModal } from "customHook"
import { LicenseStringDialog } from "component/dialogs"
import { useRouter } from "next/router"
import { endpoints } from "api"
import { green } from "@mui/material/colors"

const LicenseGenerator: React.FC = () => {
  const { control, handleSubmit, reset, watch } =
    useForm<License.GenerateLicense.GenerateLicense>({
      defaultValues: {
        uid: "",
        licenseExpiry: UserTypeMap[User.PARTNER].expiry,
        licenseType: LicenseType.SINGLE,
        productType: ProductType.PROFESSIONAL,
      },
    })
  const { handleOpen, handleClose, ...modal } = useModal()
  const handleDialogClose = useCallback(() => {
    handleClose()
  }, [])
  const [licenseString, setLicenseString] = useState("")
  const [queryLicenseLoading, setQueryLicenseLoading] = useState(false)
  const generateLicenseString = useCallback<
    SubmitHandler<License.GenerateLicense.GenerateLicense>
  >(async ({ uid, licenseExpiry, licenseType, productType }) => {
    setQueryLicenseLoading(true)
    const licenseExpiryDate = dateFormat(
      calculateLicenseExpiryDate(licenseExpiry),
      "yyyy/mm/dd"
    )
    const generateLicenseQueryString = `/cicd run license_generate -expiredDate ${licenseExpiryDate} -licenseType ${licenseType} -productType ${productType} -uid ${uid}`

    // Fetch license string
    const licenseString = await customFetch<string>(endpoints.rpaQueryLicense, "POST", { licenseQueryString: generateLicenseQueryString })

    setLicenseString(trimDoubleQuotes(licenseString))
    setQueryLicenseLoading(false)
    handleOpen()
    reset()
  }, [])
  const router = useRouter()
  const navigateToSendEmailPage = useCallback(() => {
    // get current uid and send it to the send email page
    const uid = watch("uid")
    if (!uid) return
    router.push({
      pathname: "/sendEmail",
      query: { uid },
    })
  }, [])
  const handleSendEmail = useCallback(() => {
    navigateToSendEmailPage()
  }, [])
  const handleReset = useCallback(() => {
    reset()
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
        onSubmit={handleSubmit(generateLicenseString)}
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
          <CustomTextInput label="UID" name="uid" control={control} />
          <InputProductType control={control} />
          <InputLicenseExpiry control={control} />
          <InputLicenseType control={control} />
          <Box display="flex" flexDirection="column" gap={1}>
            <Box sx={{ position: "relative" }}>
              <Button type="submit" disabled={queryLicenseLoading} fullWidth variant="contained" size="large">
                Generate Query String
              </Button>
              {
                queryLicenseLoading ? (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: green[500],
                      position: "absolute",
                      top: '50%',
                      left: '50%',
                      marginTop: '-12px',
                      marginLeft: '-12px',
                    }}
                  />
                ) : null
              }
            </Box>
            <Button
              fullWidth
              variant="contained"
              color="success"
              size="large"
              onClick={handleSendEmail}
            >
              Send Email
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="error"
              size="large"
              onClick={handleReset}
            >
              Reset
            </Button>
          </Box>
          <LicenseStringDialog
            handleClose={handleDialogClose}
            displayContent={licenseString}
            {...modal}
          />
        </Box>
      </Box>
    </Container>
  )
}

export default LicenseGenerator
