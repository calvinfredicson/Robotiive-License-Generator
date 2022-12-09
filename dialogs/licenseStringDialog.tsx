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
import type { LicenseInfo } from "component"
import { useCallback, useState } from "react"
import { delay } from "Utils"

const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}))

interface LicenseDialogProps {
  open: boolean
  displayContent: LicenseInfo
  handleDialogClose: () => void
}

enum CopyButtonText {
  COPIED = "Copied",
  COPY = "Copy Info",
}

export const LicenseDialog: React.FC<LicenseDialogProps> = ({
  displayContent: { uid, license },
  open,
  handleDialogClose,
}) => {
  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(`UID:\n${uid}\n\nLicense:\n${license}`)
    setCopyButtonText(CopyButtonText.COPIED)
    await delay(2000)
    setCopyButtonText(CopyButtonText.COPY)
  }, [license, uid])

  const [copyButtonText, setCopyButtonText] = useState(CopyButtonText.COPY)

  return (
    <CustomDialog open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <Typography variant="inherit" fontWeight="bold">
          License String
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleDialogClose}
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
        <Typography sx={{ wordBreak: "break-all" }}>{license}</Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCopy}>
          {copyButtonText}
        </Button>
      </DialogActions>
    </CustomDialog>
  )
}
