import { TextField } from "@mui/material"
import type { ReactHookFormController } from "component/types"
import { Controller } from "react-hook-form"

interface InputUIDProps extends ReactHookFormController {}

export const InputUID: React.FC<InputUIDProps> = ({ ...props }) => {
  return (
    <Controller
      render={({ field }) => (
        <TextField {...field} required fullWidth label="UID" autoFocus />
      )}
      name="uid"
      {...props}
    />
  )
}
