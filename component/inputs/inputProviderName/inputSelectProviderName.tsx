import { MenuItem, TextField, Typography } from "@mui/material"
import { useMemo } from "react"
import { Controller } from "react-hook-form"
import { Language } from "."

export interface InputSelectProviderNameProps extends ReactHookForm.Controller {
  providerList: License.API.Company[]
  language: Language
}

export const InputSelectProviderName: React.FC<
  InputSelectProviderNameProps
> = ({ providerList, language, ...props }) => {
  const nameByLanguage = useMemo(() => {
    if (language === Language.CH) {
      return "Company Chinese Name"
    } else {
      return "Company English Name"
    }
  }, [language])

  return (
    <Controller
      render={({ field }) => (
        <TextField {...field} required label={nameByLanguage} fullWidth select>
          {providerList.map((provider) => (
            <MenuItem
              key={provider[nameByLanguage]}
              value={provider["Company Chinese Name"]}
            >
              {provider[nameByLanguage]}
            </MenuItem>
          ))}
          {!providerList.length ? (
            <MenuItem>
              <Typography>Fetching data...</Typography>
            </MenuItem>
          ) : null}
        </TextField>
      )}
      name="providerName"
      {...props}
    />
  )
}
