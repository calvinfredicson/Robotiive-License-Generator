import { MenuItem, TextField, Typography } from "@mui/material"
import { Controller } from "react-hook-form"

export interface SelectChineseCompanyNameProps
  extends ReactHookForm.Controller {
  companyList: Record<string, string>[]
}

export const SelectChineseCompanyName: React.FC<
  SelectChineseCompanyNameProps
> = ({ companyList, ...props }) => {
  return (
    <Controller
      render={({ field }) => (
        <TextField
          {...field}
          required
          label="Select Recorded Company"
          fullWidth
          select
        >
          {companyList.map((company) => (
            <MenuItem
              key={company["Company Chinese Name"]}
              value={company["Company Chinese Name"]}
            >
              {company["Company Chinese Name"]}
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
