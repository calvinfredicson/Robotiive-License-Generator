import { MenuItem, TextField } from "@mui/material"
import { motion } from 'framer-motion'
import { Controller } from "react-hook-form"
import { LicenseTypeMap } from "stringTemplates"

interface InputLicenseTypeProps extends ReactHookForm.Controller { }

const InputLicenseType: React.FC<InputLicenseTypeProps> = ({ ...props }) => {
  return (
    <Controller
      render={({ field }) => (
        <motion.div
          whileHover={{ scale: 1.1 }}
        >
          <TextField {...field} label="License Type" fullWidth select sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px',
            },
          }}>
            {Object.entries(LicenseTypeMap).map(([licenseType, value]) => (
              <MenuItem key={licenseType} value={licenseType}>
                {value}
              </MenuItem>
            ))}
          </TextField>
        </motion.div>
      )}
      name="licenseType"
      {...props}
    />
  )
}

export default InputLicenseType
