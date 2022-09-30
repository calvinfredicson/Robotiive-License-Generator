import { CheckBox, CheckBoxOutlineBlankOutlined } from "@material-ui/icons"
import { Autocomplete, Checkbox, TextField } from "@mui/material"
import { forwardRef } from "react"
import { Controller } from "react-hook-form"
import { ComponentTypeMap } from "stringTemplates"

interface ComponentTypeProps extends ReactHookForm.Controller {}

export const InputComponentType = forwardRef<any, ComponentTypeProps>(
  function ComponentTypeInput({ control, ...props }, ref) {
    return (
      <Controller
        render={({ field: { onChange, ...field } }) => (
          <Autocomplete
            {...props}
            {...field}
            fullWidth
            ref={ref}
            multiple
            options={Object.values(ComponentTypeMap)}
            disableCloseOnSelect
            getOptionLabel={(value) => value}
            onChange={(_, value) => onChange([...value])}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={<CheckBoxOutlineBlankOutlined />}
                  checkedIcon={<CheckBox />}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Component Type"
                placeholder="Component Type"
              />
            )}
          />
        )}
        name="componentType"
        control={control}
      ></Controller>
    )
  }
)
