import Image from "next/image"
import { Box, Button, useMediaQuery, useTheme } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { LicenseType, ProductType } from "types"
import { trimDoubleQuotes } from "Utils"
import { useModal } from "customHook"
import { useRouter } from "next/router"
import { endpoints } from "api"
import { motion } from "framer-motion"
import {
  InputLicenseExpiry,
  InputLicenseType,
  InputProductType,
  CustomTextInput,
  LicenseStringDialog,
  SubmitButton
} from "component"
import useMutation from 'customHook/useMutation'

const LicenseGenerator: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const methods =
    useForm<License.GenerateLicense.GenerateLicense>({
      defaultValues: {
        uid: "",
        licenseType: LicenseType.SINGLE,
        productType: ProductType.PROFESSIONAL,
      },
    })
  const { handleOpen, handleClose, ...modal } = useModal()
  const handleDialogClose = useCallback(() => {
    handleClose()
  }, [])
  const [licenseString, setLicenseString] = useState("")
  const { mutateData: getLicenseString, loading, error } = useMutation()
  const generateLicenseString = useCallback<
    SubmitHandler<License.GenerateLicense.GenerateLicense>
  >(async ({ uid, licenseExpiry, licenseType, productType }) => {
    const generateLicenseQueryString = `/cicd run license_generate -expiredDate ${licenseExpiry} -licenseType ${licenseType} -productType ${productType} -uid ${uid}`
    const reqBody = { licenseQueryString: generateLicenseQueryString }
    const mutationResponse = await getLicenseString(endpoints.rpaQueryLicense, JSON.stringify(reqBody))
    const generatedLicense = await mutationResponse?.json()
    if (!generatedLicense) return
    setLicenseString(trimDoubleQuotes(generatedLicense))
    handleOpen()
  }, [])

  useEffect(() => {
    if (!error) return
    console.error(error)
  }, [error])

  const router = useRouter()
  const navigateToSendEmailPage = useCallback(() => {
    // get current uid and send it to the send email page
    const uid = methods.watch("uid")
    if (!licenseString.length || !uid.length) return
    router.push({
      pathname: "/sendEmail",
      query: { licenseString, uid }
    })
  }, [methods.watch, licenseString, router])

  const handleSendEmail = useCallback(() => {
    navigateToSendEmailPage()
  }, [licenseString])

  const handleReset = useCallback(() => {
    methods.reset()
  }, [])

  return (
    <FormProvider {...methods}>
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
          onSubmit={methods.handleSubmit(generateLicenseString)}
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
                  priority
                  style={{
                    cursor: "pointer"
                  }}
                />
              </motion.div>
            </Box>
            <CustomTextInput label="UID" name="uid" />
            <InputProductType />
            <InputLicenseExpiry />
            <InputLicenseType />
            <Box display="flex" flexDirection="column" gap={1}>
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 1.2 }}
              >
                <SubmitButton loading={loading} buttonText="Generate License" />
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
    </FormProvider>
  )
}

export default LicenseGenerator
