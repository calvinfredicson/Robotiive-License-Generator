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
  displayContent: string
  handleDialogClose: () => void
}

enum CopyButtonText {
  COPIED = "Copied",
  COPY = "Copy Info",
}

export const LicenseDialog: React.FC<LicenseDialogProps> = ({
  displayContent,
  open,
  handleDialogClose,
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
          Query String
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
        <Typography sx={{ wordBreak: "break-all" }}>{displayContent}</Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCopy}>
          {copyButtonText}
        </Button>
      </DialogActions>
    </CustomDialog>
  )
}
