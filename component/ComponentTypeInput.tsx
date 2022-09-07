import {
  CheckBox,
  CheckBoxOutlineBlankOutlined,
  Clear,
} from "@material-ui/icons"
import {
  Autocomplete,
  AutocompleteProps,
  Checkbox,
  TextField,
} from "@mui/material"
import { ComponentTypeMap } from "../stringTemplates"

interface ComponentTypeProps
  extends Partial<AutocompleteProps<string, true, true, any>> {
  clearInput: () => void
}

export const ComponentTypeInput: React.FC<ComponentTypeProps> = ({
  clearInput,
  ...props
}) => {
  return (
    <Autocomplete
      {...props}
      multiple
      clearIcon={<Clear fontSize="small" onClick={clearInput} />}
      options={Object.values(ComponentTypeMap)}
      disableCloseOnSelect
      getOptionLabel={(value) => value}
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
