import { motion } from "framer-motion"
import { MenuItem, TextField, useTheme } from "@mui/material"
import { ChangeEvent } from "react"
import { UserTypeMap } from "stringTemplates"
import { User } from "types"

interface CustomLicenseExpiryProps {
  licenseExpiry: User
  handleLicenseExpiryChange: (e: ChangeEvent<HTMLInputElement>) => void
}

/**
 * Control internal state manually
 * Set the updated value to React Hook Form
 * Reason: for date direct date calculation inside component 
 */

export const CustomLicenseExpiry: React.FC<CustomLicenseExpiryProps> = ({ licenseExpiry, handleLicenseExpiryChange }) => {
  const { palette } = useTheme()
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1.1 }}
    >
      <TextField value={licenseExpiry} onChange={handleLicenseExpiryChange} required label="License Expiry" fullWidth select sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "20px",
          color: licenseExpiry === User.CUSTOM ? palette.success.light : undefined
        },
      }}>
        {Object.entries(UserTypeMap).map(([user, { type, expiry }]) => (
          <MenuItem
            key={type}
            value={user}
          >{`${type} - ${expiry} month(s)`}</MenuItem>
        ))}
      </TextField>
    </motion.div>
  )
}

