import { MenuItem, TextField } from "@mui/material"
import { motion } from 'framer-motion'
import { Controller } from "react-hook-form"
import { ProductTypeMap } from "stringTemplates"

interface InputProductTypeProps extends ReactHookForm.Controller { }

const InputProductType: React.FC<InputProductTypeProps> = ({ ...props }) => {
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
            {Object.entries(ProductTypeMap).map(([_, { productTypeName, productTypeCode }]) => (
              <MenuItem
                key={productTypeCode}
                value={productTypeCode}
              >{productTypeName}</MenuItem>
            ))}
          </TextField>
        </motion.div>
      )}
      name="productType"
      {...props}
    />
  )
}

export default InputProductType
