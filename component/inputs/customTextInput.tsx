import { TextField } from "@mui/material"
import { motion } from 'framer-motion'
import { Controller } from "react-hook-form"

interface InputUIDProps extends ReactHookForm.Controller {
  label: string
  name: string
  disabled?: boolean
}

const CustomTextInput: React.FC<InputUIDProps> = ({
  label,
  name,
  disabled,
  ...props
}) => {
  return (
    <Controller
      render={({ field }) => (
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.1 }}
        >
          <TextField
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
              },
            }}
            disabled={disabled || false}
            {...field}
            required
            fullWidth
            label={label}
            autoFocus
          />
        </motion.div>
      )}
      name={name}
      {...props}
    />
  )
}

export default CustomTextInput
