import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useModal } from "customHook";

interface SendLicenseConfirmationDialogProps
  extends Omit<ReturnType<typeof useModal>, "handleOpen"> {
  message: string;
  handleOk?: () => void;
  title: string;
}

const SendLicenseConfirmationDialog: React.FC<
  SendLicenseConfirmationDialogProps
> = ({ open, handleClose, message, handleOk, title }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOk ? handleOk : handleClose}>Ok</Button>
        <Button color="error" onClick={handleClose} autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SendLicenseConfirmationDialog;
