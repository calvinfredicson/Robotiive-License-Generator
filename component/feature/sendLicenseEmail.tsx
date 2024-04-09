import Image from "next/image"
import { Box, useMediaQuery, useTheme } from "@mui/material"
import { generateEmailContent } from "Utils"
import { CustomTextInput, SubmitButton } from "component"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useCallback, useEffect } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import useMutation from "customHook/useMutation"

interface SendLicenseEmailProps {
  uid?: string,
  licenseString: string
}

const SendLicenseEmail: React.FC<SendLicenseEmailProps> = ({ uid, licenseString }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const { replace } = useRouter()
  const { mutateData: fetchSendEmail, loading, error } = useMutation()
  const methods =
    useForm<License.GenerateLicense.SendEmail>({
      defaultValues: {
        uid: uid || "",
        from: "calvin.fredicson@gmail.com",
        to: "",
        subject: "RPA License Information",
        licenseString: licenseString || "",
      },
    })
  const sendEmail = useCallback<
    SubmitHandler<License.GenerateLicense.SendEmail>
  >(async ({ uid, from, to, subject, licenseString }) => {
    const url = "/api/sendEmail"
    const reqBody: License.API.SendEmailBody = {
      uid,
      from,
      to,
      subject,
      emailContent: generateEmailContent(to, uid, licenseString),
    }
    const response = await fetchSendEmail(url, JSON.stringify(reqBody))
    console.log(response?.json())
    methods.reset()
    if (window.confirm("Successfully sent Email! Do you want to generate another license?") === true) {
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
            <CustomTextInput
              label="From"
              name="from"
              disabled={true}
            />
            <CustomTextInput label="To" name="to" />
            <CustomTextInput label="Subject" name="subject" />
            <CustomTextInput
              label="License String"
              name="licenseString"
            />
            <motion.div
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.1 }}>
              {/* <Button type="submit" fullWidth variant="contained" sx={{ borderRadius: 5 }}>
                Send Email
              </Button> */}
              <SubmitButton loading={loading} buttonText="Send Email" />
            </motion.div>
          </Box>
        </Box>
      </Box>
    </FormProvider>
  )
}

export default SendLicenseEmail
