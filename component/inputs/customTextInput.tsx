import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

interface InputUIDProps extends ReactHookForm.Controller {
  label: string;
  name: string;
}

const CustomTextInput: React.FC<InputUIDProps> = ({
  label,
  name,
  ...props
}) => {
  return (
    <Controller
      render={({ field }) => (
        <TextField {...field} required fullWidth label={label} autoFocus />
      )}
      name={name}
      {...props}
    />
  );
};

export default CustomTextInput;
