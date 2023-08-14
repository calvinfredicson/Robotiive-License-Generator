import { MenuItem, TextField } from "@mui/material"
import { Controller } from "react-hook-form"
import { ProductTypeMap } from "stringTemplates"

interface InputProductTypeProps extends ReactHookForm.Controller {}

const InputProductType: React.FC<InputProductTypeProps> = ({...props}) => {
  return (
        <Controller
      render={({ field }) => (
        <TextField {...field} required label="License Expiry" fullWidth select>
          {Object.entries(ProductTypeMap).map(([_, { productTypeName,  productTypeCode }]) => (
            <MenuItem
              key={productTypeCode}
              value={productTypeCode}
            >{productTypeName}</MenuItem>
          ))}
        </TextField>
      )}
      name="productType"
      {...props}
    />
  )
}

export default InputProductType
