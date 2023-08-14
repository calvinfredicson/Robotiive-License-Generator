import { MenuItem, TextField } from "@mui/material"
import { Controller } from "react-hook-form"
import { LicenseTypeMap } from "stringTemplates"

interface InputLicenseTypeProps extends ReactHookForm.Controller {}

const InputLicenseType: React.FC<InputLicenseTypeProps> = ({...props}) => {
  return (
      <Controller
            render={({ field }) => (
              <TextField {...field} label="License Type" fullWidth select>
                {Object.entries(LicenseTypeMap).map(([licenseType, value]) => (
                  <MenuItem key={licenseType} value={licenseType}>
                    {value}
                  </MenuItem>
                ))}
              </TextField>
            )}
            name="licenseType"
            {...props}
          />
  )
}

export default InputLicenseType
