import { MenuItem, TextField, Typography } from "@mui/material"
import { Controller } from "react-hook-form"

export interface SelectEnglishCompanyNameProps
  extends ReactHookForm.Controller {
  companyList: Record<string, string>[]
}

export const SelectEnglishCompanyName: React.FC<
  SelectEnglishCompanyNameProps
> = ({ companyList, ...props }) => {
  return (
    <Controller
      render={({ field }) => (
        <TextField
          {...field}
          required
          label="Select recorded company english name"
          fullWidth
          select
        >
          {companyList.map((company) => (
            <MenuItem
              key={company["Company Chinese Name"]}
              value={company["Company Chinese Name"]}
            >
              {company["Company English Name"]}
            </MenuItem>
          ))}
          {!companyList.length ? (
            <MenuItem>
              <Typography>Fetching data...</Typography>
            </MenuItem>
          ) : null}
        </TextField>
      )}
      name="companyName"
      {...props}
    />
  )
}
