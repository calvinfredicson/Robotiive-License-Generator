import { CheckBox, CheckBoxOutlineBlankOutlined } from "@material-ui/icons"
import { Autocomplete, Checkbox, TextField } from "@mui/material"
import { ForwardedRef, forwardRef, useCallback, useMemo } from "react"
import { Controller, ControllerRenderProps } from "react-hook-form"
import { ComponentTypeMap } from "stringTemplates"
import { ComponentType } from "types"

interface ComponentTypeProps extends ReactHookForm.Controller {}

export const InputComponentType = forwardRef<any, ComponentTypeProps>(
  function ComponentTypeInput({ control }, ref) {
    const componentType = useMemo(() => {
      return Object.keys(ComponentTypeMap)
        .sort()
        .map((key) => ComponentTypeMap[key as unknown as ComponentType])
    }, [])

    return (
      <Controller
        render={({ field: { ...field } }) => (
          <ComponentAutocomplete
            {...field}
            componentType={componentType}
            ref={ref}
          />
        )}
        name="componentType"
        control={control}
      ></Controller>
    )
  }
)

interface ComponentAutocompleteProps
  extends Omit<ControllerRenderProps, "ref"> {
  ref: ForwardedRef<any>
  componentType: string[]
}

const ComponentAutocomplete: React.FC<ComponentAutocompleteProps> = ({
  ref,
  componentType,
  ...field
}) => {
  const onSelectChange = useCallback<
    NonNullable<ControllerRenderProps["onChange"]>
  >(
    (value) => {
      field.onChange([...value])
    },
    [field]
  )

  return (
    <Autocomplete
      {...field}
      fullWidth
      ref={ref}
      multiple
      options={componentType}
      disableCloseOnSelect
      getOptionLabel={(value) => value}
      onChange={(_, value) => onSelectChange(value)}
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
  )
}
