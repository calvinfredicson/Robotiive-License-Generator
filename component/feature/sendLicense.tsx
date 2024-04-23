import Image from "next/image"
import { Box, useMediaQuery, useTheme } from "@mui/material"
import { generateLicenseMessageContent } from "Utils"
import { CustomTextInput, SubmitButton } from "component"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useCallback, useEffect } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import useMutation from "customHook/useMutation"
import { SendLicenseRequestBody } from "pages/api/sendLicense"

interface SendLicenseMessageProps {
  uid?: string,
  licenseString: string
}

const SendLicenseMessage: React.FC<SendLicenseMessageProps> = ({ uid, licenseString }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const { replace } = useRouter()
  const { mutateData: fetchSendLicense, loading, error } = useMutation()
  const methods =
    useForm<License.GenerateLicense.SendLicenseMessage>({
      defaultValues: {
        uid: uid || "",
        lineUserId: "",
        licenseString: licenseString || "",
      },
    })
  const sendEmail = useCallback<
    SubmitHandler<License.GenerateLicense.SendLicenseMessage>
  >(async ({ uid, lineUserId, licenseString }) => {
    const url = "/api/sendLicense"
    const reqBody: SendLicenseRequestBody = {
      lineUserId,
      message: generateLicenseMessageContent(uid, licenseString),
    }
    const response = await fetchSendLicense(url, JSON.stringify(reqBody))
    console.log(response?.json())
    methods.reset()
    if (window.confirm("Successfully sent! Do you want to generate another license?") === true) {
      replace("/generateLicense")
    }
  }, [])

  useEffect(() => {
    if (!error) return
    console.error(error)
  }, [error])

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
          onSubmit={methods.handleSubmit(sendEmail)}
        >
          <Box width="100%" display="flex" flexDirection="column" gap={3} sx={{ backgroundColor: "white", height: isMobile ? "100vh" : null, borderRadius: 15, padding: 5, paddingTop: isMobile ? 20 : null }} >
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
            <CustomTextInput label="UID" name="uid" />
            <CustomTextInput label="Line User Id" name="lineUserId" />
            <CustomTextInput
              label="License String"
              name="licenseString"
            />
            <motion.div
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.1 }}>
              <SubmitButton loading={loading} buttonText="Send Email" />
            </motion.div>
          </Box>
        </Box>
      </Box>
    </FormProvider>
  )
}

export default SendLicenseMessage
