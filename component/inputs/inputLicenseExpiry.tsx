import { MenuItem, TextField } from "@mui/material"
import { motion } from 'framer-motion'
import { Controller } from "react-hook-form"
import { UserTypeMap } from "stringTemplates"

interface InputLicenseExpiryProps extends ReactHookForm.Controller { }

const InputLicenseExpiry: React.FC<InputLicenseExpiryProps> = ({ ...props }) => {
  return (
    <Controller
      render={({ field }) => (
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.1 }}
        >
          <TextField {...field} required label="License Expiry" fullWidth select sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px',
            },
          }}>
            {Object.entries(UserTypeMap).map(([_, { type, expiry }]) => (
              <MenuItem
                key={type}
                value={expiry}
              >{`${type} - ${expiry} month(s)`}</MenuItem>
            ))}
          </TextField>
        </motion.div >
      )}
      name="licenseExpiry"
      {...props}
    />
  )
}

export default InputLicenseExpiry
