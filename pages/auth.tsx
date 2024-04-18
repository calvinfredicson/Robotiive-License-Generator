import React, { useCallback, useEffect } from "react"
import { Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, Slide } from "@mui/material"
import { auth } from "firebase"
import Image from "next/image"
import { useRouter } from "next/router"
import { TransitionProps } from "@mui/material/transitions"
import { useSignInWithGoogle } from "react-firebase-hooks/auth"
import { green } from "@mui/material/colors"
import CustomSnackbar from 'component/customSnackbar'
import { useAlert } from 'customHook'

interface AuthProps {
  showAuth: boolean
}

const Auth: React.FC<AuthProps> = ({ showAuth }) => {
  const { replace } = useRouter()
  const [signInWithGoogle, _, loading, error] = useSignInWithGoogle(auth)
  const { showAlert, ...alertErrorProps } = useAlert()

  const handleGoogleSignIn = useCallback(async () => {
    signInWithGoogle()
  }, [replace])

  useEffect(() => {
    if (!error) return
    showAlert()
  }, [error])

  return (
    <Dialog
      open={showAuth}
      TransitionComponent={Transition}
      keepMounted
      disableEscapeKeyDown
      PaperProps={{ sx: { borderRadius: 15, padding: "20px" } }}
    >
      <DialogTitle sx={{ fontSize: "24px", fontWeight: "bold", textAlign: "center", mb: 2 }}>Are you an authorized user?</DialogTitle>
      <DialogContent sx={{ textAlign: "center" }}>
        <Box sx={{ position: "relative" }}>
          <Button
            startIcon={<Image src="/google_logo.png" height={30} width={30} alt="Google Icon" />}
            onClick={handleGoogleSignIn}
            variant="outlined"
            disabled={loading}
            sx={{ mt: 1, borderRadius: 10, fontSize: "18px", padding: "12px 24px", textTransform: "none" }}
          >
            Sign In With Google
          </Button>
          {
            loading ? (
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
      </DialogContent>
      <CustomSnackbar text="You are not authorized!" type="error" {...alertErrorProps} />
    </Dialog>
  )
}


export const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default Auth
