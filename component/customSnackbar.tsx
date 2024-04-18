import { Alert, AlertColor, Snackbar } from '@mui/material'
import React from 'react'

interface CustomSnackbarProps {
  text: string,
  open: boolean,
  type: AlertColor
  handleClose: (_?: React.SyntheticEvent | Event, reason?: string) => void
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({ open, type, handleClose, text }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        severity={type}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {text}
      </Alert>
    </Snackbar>
  )
}

export default CustomSnackbar