import { Box, Button, useMediaQuery, useTheme } from "@mui/material"
import { customFetch, generateEmailContent } from "Utils"
import { CustomTextInput } from "component"
import { CustomAlert } from "component/alerts"
import { useSnackbar } from "customHook"
import { motion } from 'framer-motion'
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import Image from 'next/image'

interface SendLicenseEmailProps {
  uid?: string,
  licenseString: string
}

const SendLicenseEmail: React.FC<SendLicenseEmailProps> = ({ uid, licenseString }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const { replace } = useRouter()
  const { control, handleSubmit, reset } =
    useForm<License.GenerateLicense.SendEmail>({
      defaultValues: {
        uid: uid || "",
        from: "calvin.fredicson@gmail.com",
        to: "",
        subject: "RPA License Information",
        licenseString: licenseString || "",
      },
    })
  const {
    handleOpen: errorHandleOpen,
    handleClose: errorHandleClose,
    ...errorModal
  } = useSnackbar(2000)
  const sendEmail = useCallback<
    SubmitHandler<License.GenerateLicense.SendEmail>
  >(async ({ uid, from, to, subject, licenseString }) => {
    try {
      const url = "/api/sendEmail"
      const reqBody: License.API.SendEmailBody = {
        uid,
        from,
        to,
        subject,
        emailContent: generateEmailContent(to, uid, licenseString),
      }
      await customFetch<License.API.SendEmailBody>(
        url,
        "POST",
        reqBody
      )
      reset()
      if (window.confirm("Successfully sent Email! Do you want to generate another license?") === true) {
        replace("/generateLicense")
      }
    } catch (err) {
      console.log(err)
      errorHandleOpen()
    }
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
        onSubmit={handleSubmit(sendEmail)}
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
                  cursor: 'pointer'
                }}
              />
            </motion.div>
          </Box>
          <CustomTextInput control={control} label="UID" name="uid" />
          <CustomTextInput
            control={control}
            label="From"
            name="from"
            disabled={true}
          />
          <CustomTextInput control={control} label="To" name="to" />
          <CustomTextInput control={control} label="Subject" name="subject" />
          <CustomTextInput
            control={control}
            label="License String"
            name="licenseString"
          />
          <motion.div
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.1 }}>
            <Button type="submit" fullWidth variant="contained" sx={{ borderRadius: 5 }}>
              Send Email
            </Button>
          </motion.div>
        </Box>
      </Box>
      <CustomAlert
        message={"Error Occured!"}
        handleClose={errorHandleClose}
        {...errorModal}
      />
    </Box >
  )
}

export default SendLicenseEmail
