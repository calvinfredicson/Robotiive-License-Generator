import { MenuItem, TextField } from "@mui/material"
import { Controller } from "react-hook-form"

interface SelectRecordedCompanyProps extends ReactHookForm.Controller {
  companyList: License.GenerateLicense.RecordedCompanyList[]
}

export const SelectRecordedCompany: React.FC<SelectRecordedCompanyProps> = ({
  companyList,
  ...props
}) => {
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
              key={company["Company Name"]}
              value={company["Company Name"]}
            >
              {company["Company Name"]}
            </MenuItem>
          ))}
        </TextField>
      )}
      name="recordedCompany"
      {...props}
    />
  )
}
