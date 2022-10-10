import { MenuItem, TextField } from "@mui/material"
import { Controller } from "react-hook-form"
import { RecordTypeMap } from "stringTemplates"

interface InputRecordTypeProps extends ReactHookForm.Controller {}

export const InputRecordType: React.FC<InputRecordTypeProps> = (props) => {
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
          {Object.values(RecordTypeMap).map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
      )}
      name="recordType"
      {...props}
    />
  )
}
