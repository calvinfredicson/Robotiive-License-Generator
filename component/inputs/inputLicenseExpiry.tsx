import { MenuItem, TextField } from "@mui/material"
import { Controller } from "react-hook-form"
import { UserTypeMap } from "stringTemplates"

interface InputLicenseExpiryProps extends ReactHookForm.Controller {}

const InputLicenseExpiry: React.FC<InputLicenseExpiryProps> = ({ ...props }) => {
  return (
    <Controller
      render={({ field }) => (
        <TextField {...field} required label="License Expiry" fullWidth select>
          {Object.entries(UserTypeMap).map(([_, { type, expiry }]) => (
            <MenuItem
              key={type}
              value={expiry}
            >{`${type} - ${expiry} month(s)`}</MenuItem>
          ))}
        </TextField>
      )}
      name="licenseExpiry"
      {...props}
    />
  )
}

export default InputLicenseExpiry
