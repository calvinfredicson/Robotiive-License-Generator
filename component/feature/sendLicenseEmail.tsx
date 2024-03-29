import { Box, Button, Container, Typography } from "@mui/material"
import { customFetch, generateEmailContent } from "Utils"
import { CustomTextInput } from "component"
import { CustomAlert } from "component/alerts"
import { useSnackbar } from "customHook"
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

interface SendLicenseEmailProps {
  uid?: string,
  licenseString: string
}

const SendLicenseEmail: React.FC<SendLicenseEmailProps> = ({ uid, licenseString }) => {
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
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box component="form" width="100%" onSubmit={handleSubmit(sendEmail)}>
        <Box display="flex" flexDirection="column" gap={3}>
          <Typography variant="h4" textAlign="center">
            Send License Through Email
          </Typography>
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
          <Button type="submit" fullWidth variant="contained">
            Send Email
          </Button>
        </Box>
      </Box>
      <CustomAlert
        message={"Error Occured!"}
        handleClose={errorHandleClose}
        {...errorModal}
      />
    </Container>
  )
}

export default SendLicenseEmail
