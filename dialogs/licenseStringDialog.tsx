import { Close } from "@material-ui/icons"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
  Typography,
} from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import { delay } from "Utils"

const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}))

interface LicenseStringDialogProps {
  uid: string
  licenseString: string
  onClose: () => void
}

enum CopyButtonText {
  COPIED = "Copied",
  COPY = "Copy Info",
}

export const LicenseStringDialog: React.FC<LicenseStringDialogProps> = ({
  uid,
  licenseString,
  onClose,
}) => {
  const [open, setOpen] = useState(false)
  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(
      `UID:\n${uid}\n\nLicense:\n${licenseString}`
    )
    setCopyButtonText(CopyButtonText.COPIED)
    await delay(2000)
    setCopyButtonText(CopyButtonText.COPY)
  }, [licenseString, uid])

  const [copyButtonText, setCopyButtonText] = useState(CopyButtonText.COPY)

  const handleClose = useCallback(() => {
    onClose()
    setOpen(false)
  }, [onClose])

  useEffect(() => {
    if (!licenseString) return
    setOpen(true)
  }, [licenseString])

  return (
    <CustomDialog open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <Typography variant="inherit" fontWeight="bold">
          License String
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography sx={{ wordBreak: "break-all" }}>{licenseString}</Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCopy}>
          {copyButtonText}
        </Button>
      </DialogActions>
    </CustomDialog>
  )
}
