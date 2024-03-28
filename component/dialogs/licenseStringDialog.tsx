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
import { useCallback, useState } from "react"
import { delay } from "Utils"
import { useModal } from "customHook"
import { Close } from "@mui/icons-material"

const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}))

interface LicenseDialogProps
  extends Omit<ReturnType<typeof useModal>, "handleOpen"> {
  displayContent: string
}

enum CopyButtonText {
  COPIED = "Copied",
  COPY = "Copy Info",
}

const LicenseStringDialog: React.FC<LicenseDialogProps> = ({
  displayContent,
  open,
  handleClose,
}) => {
  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(displayContent)
    setCopyButtonText(CopyButtonText.COPIED)
    await delay(2000)
    setCopyButtonText(CopyButtonText.COPY)
  }, [displayContent])

  const [copyButtonText, setCopyButtonText] = useState(CopyButtonText.COPY)

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
        <Typography sx={{ wordBreak: "break-all" }}>
          {displayContent}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCopy}>
          {copyButtonText}
        </Button>
      </DialogActions>
    </CustomDialog>
  )
}

export default LicenseStringDialog
