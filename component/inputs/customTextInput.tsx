import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

interface InputUIDProps extends ReactHookForm.Controller {
  label: string;
  name: string;
  disabled?: boolean;
}

const CustomTextInput: React.FC<InputUIDProps> = ({
  label,
  name,
  disabled,
  ...props
}) => {
  return (
    <Controller
      render={({ field }) => (
        <TextField
          disabled={disabled || false}
          {...field}
          required
          fullWidth
          label={label}
          autoFocus
        />
      )}
      name={name}
      {...props}
    />
  );
};

export default CustomTextInput;
