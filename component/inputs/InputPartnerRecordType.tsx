import { MenuItem, TextField } from "@mui/material"
import { Controller } from "react-hook-form"
import { PartnerRecordTypeMap } from "stringTemplates"

interface InputPartnerRecordTypeProps extends ReactHookForm.Controller {}

export const InputPartnerRecordType: React.FC<InputPartnerRecordTypeProps> = ({
  ...props
}) => {
  return (
    <Controller
      render={({ field }) => (
        <TextField
          {...field}
          required
          label="Select Record Type"
          fullWidth
          select
        >
          {Object.entries(PartnerRecordTypeMap).map(([key, value]) => (
            <MenuItem key={key} value={value}>
              {value}
            </MenuItem>
          ))}
        </TextField>
      )}
      name="partnerRecordType"
      {...props}
    />
  )
}
