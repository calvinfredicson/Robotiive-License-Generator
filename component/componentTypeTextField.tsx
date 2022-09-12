import { CheckBox, CheckBoxOutlineBlankOutlined } from "@material-ui/icons"
import {
  Autocomplete,
  AutocompleteProps,
  Checkbox,
  TextField,
  UseAutocompleteProps,
} from "@mui/material"
import { forwardRef, useCallback } from "react"
import { ControllerRenderProps } from "react-hook-form"
import { LicenseGeneratorInfo } from "../types"
import { ComponentTypeMap } from "../stringTemplates"

type ComponentTypeProps = Partial<AutocompleteProps<string, true, true, any>> &
  ControllerRenderProps<LicenseGeneratorInfo, "componentType">

export const ComponentTypeInput = forwardRef<any, ComponentTypeProps>(
  function ComponentTypeInput({ onChange, ...props }, ref) {
    const onComponentTypeChange = useCallback<
      NonNullable<UseAutocompleteProps<string, true, true, any>["onChange"]>
    >(
      (_, value) => {
        onChange([...value])
      },
      [onChange]
    )
    return (
      <Autocomplete
        {...props}
        ref={ref}
        multiple
        options={Object.values(ComponentTypeMap)}
        disableCloseOnSelect
        getOptionLabel={(value) => value}
        onChange={onComponentTypeChange}
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
)
