import { Alert, AlertColor, Snackbar } from "@mui/material";
import { useSnackbar } from "customHook";

interface CustomAlertProps
  extends Omit<ReturnType<typeof useSnackbar>, "handleOpen"> {
  message: string;
  type?: AlertColor;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  open,
  handleClose,
  message,
  type,
  timeout,
}) => {
  return (
    <Snackbar open={open} autoHideDuration={timeout} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert;
