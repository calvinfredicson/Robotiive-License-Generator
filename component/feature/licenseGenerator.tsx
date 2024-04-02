import { Box, Button, CircularProgress, useMediaQuery, useTheme } from "@mui/material"
import { useCallback, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { UserTypeMap } from "stringTemplates"
import { LicenseType, ProductType, User } from "types"
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
import Image from "next/image"
import { motion } from "framer-motion"

const LicenseGenerator: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
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
  }, [])
  const router = useRouter()
  const navigateToSendEmailPage = useCallback(() => {
    // get current uid and send it to the send email page
    const uid = watch("uid")
    if (!licenseString.length || !uid.length) return
    router.push({
      pathname: "/sendEmail",
      query: { licenseString, uid }
    })
  }, [watch, licenseString, router])

  const handleSendEmail = useCallback(() => {
    navigateToSendEmailPage()
  }, [licenseString])

  const handleReset = useCallback(() => {
    reset()
  }, [])

  return (
    <Box
      position="fixed"
      padding={0}
      top={0}
      left={0}
      minWidth="100vw"
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="#a3c1f5"
    >
      <Box
        component="form"
        // 430 = Iphone 14 Pro width
        maxWidth={isMobile ? "100vw" : 430}
        width="100%"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        onSubmit={handleSubmit(generateLicenseString)}
      >
        <Box width="100%" display="flex" flexDirection="column" gap={3} sx={{ backgroundColor: "white", height: isMobile ? "100vh" : null, borderRadius: 15, padding: 5, paddingTop: isMobile ? 20 : null }}>
          <Box
            display="flex"
            flexDirection="column"
            gap={1}
            justifyContent="center"
            alignItems="center"
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8, rotate: -90, borderRadius: "100%" }}
            >
              <Image
                src="/BiiRobot.png"
                alt="Bii robot"
                // calculate size from its original dimension (526*428 Pixels)
                width={526 / 4}
                height={428 / 4}
                style={{
                  cursor: "pointer"
                }}
              />
            </motion.div>
          </Box>
          <CustomTextInput label="UID" name="uid" control={control} />
          <InputProductType control={control} />
          <InputLicenseExpiry control={control} />
          <InputLicenseType control={control} />
          <Box display="flex" flexDirection="column" gap={1}>
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 1.2 }}
            >
              <Box sx={{ position: "relative" }}>
                <Button type="submit" disabled={queryLicenseLoading} fullWidth variant="contained" size="large" sx={{ borderRadius: "15px" }}>
                  Generate License
                </Button>
                {
                  queryLicenseLoading ? (
                    <CircularProgress
                      size={24}
                      sx={{
                        color: green[500],
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        marginTop: "-12px",
                        marginLeft: "-12px",
                      }}
                    />
                  ) : null
                }
              </Box>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 1.2 }}
            >
              <Button
                fullWidth
                variant="contained"
                color="success"
                size="large"
                onClick={handleSendEmail}
                sx={{ borderRadius: "15px" }}
              >
                Send Email
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 1.2 }}
            >
              <Button
                fullWidth
                variant="contained"
                color="error"
                size="large"
                sx={{ borderRadius: "15px" }}
                onClick={handleReset}
              >
                Reset
              </Button>
            </motion.div>
          </Box>
          <LicenseStringDialog
            handleSendEmail={handleSendEmail}
            handleClose={handleDialogClose}
            displayContent={licenseString}
            {...modal}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default LicenseGenerator
