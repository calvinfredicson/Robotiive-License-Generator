import { TextField } from "@mui/material"
import { Controller } from "react-hook-form"

interface InputNewCompanyProps extends ReactHookForm.Controller {}

export const InputNewCompany: React.FC<InputNewCompanyProps> = ({
  ...props
}) => {
  return (
    <Controller
      render={({ field }) => (
        <TextField {...field} required fullWidth label="New Company Name" />
      )}
      name="companyName"
      {...props}
    />
  )
}
