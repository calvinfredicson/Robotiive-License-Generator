import { TextField } from "@mui/material"
import { Controller } from "react-hook-form"

interface InputUIDProps extends ReactHookForm.Controller {}

const InputUID: React.FC<InputUIDProps> = ({ ...props }) => {
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

export default InputUID
