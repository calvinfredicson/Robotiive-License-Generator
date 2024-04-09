import dayjs from "dayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { MobileDatePicker } from "@mui/x-date-pickers"

interface ManualLicenseExpiryProps {
  manualExpiryDate: dayjs.Dayjs
  handleManualDateChange: (date: dayjs.Dayjs | null) => void
}

const ManualLicenseExpiry: React.FC<ManualLicenseExpiryProps> = ({ manualExpiryDate, handleManualDateChange }) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
        label="Select expiry date"
        disablePast
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "20px",
          },
        }} value={manualExpiryDate} onChange={handleManualDateChange} defaultValue={dayjs()} />
    </LocalizationProvider>
  )
}

export default ManualLicenseExpiry