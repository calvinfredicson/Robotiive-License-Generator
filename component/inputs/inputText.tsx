import { TextField } from "@mui/material"
import { Controller } from "react-hook-form"

interface InputText extends ReactHookForm.Controller {
  name: string
}

export const InputText: React.FC<InputText> = ({ name, ...props }) => {
  return (
    <Controller
      render={({ field }) => (
        <TextField {...field} required fullWidth label={name} autoFocus />
      )}
      name={name}
      {...props}
    />
  )
}
