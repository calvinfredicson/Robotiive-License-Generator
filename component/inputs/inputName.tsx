import { TextField } from "@mui/material"
import type { ReactHookFormController } from "component/types"
import { Controller } from "react-hook-form"

interface InputNameProps extends ReactHookFormController {}

export const InputName: React.FC<InputNameProps> = ({ ...props }) => {
  return (
    <Controller
      render={({ field }) => (
        <TextField {...field} required fullWidth label="Name" autoFocus />
      )}
      name="name"
      {...props}
    />
  )
}
