import { MenuItem, TextField } from "@mui/material"
import { motion } from 'framer-motion'
import { Controller, useFormContext } from "react-hook-form"
import { LicenseTypeMap } from "stringTemplates"

interface InputLicenseTypeProps { }

const InputLicenseType: React.FC<InputLicenseTypeProps> = () => {
  const rhfProps = useFormContext()
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
      {...rhfProps}
    />
  )
}

export default InputLicenseType
