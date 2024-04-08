import { Box, Button, ButtonProps, CircularProgress } from '@mui/material'
import { green } from '@mui/material/colors'

interface SubmitButtonProps extends ButtonProps {
  loading: boolean,
  buttonText: string
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ loading, buttonText, ...props }) => {
  return (
    <Box sx={{ position: "relative" }}>
      <Button type="submit" disabled={loading} fullWidth variant="contained" size="large" sx={{ borderRadius: "15px" }} {...props}>
        {buttonText}
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
  )
}

export default SubmitButton