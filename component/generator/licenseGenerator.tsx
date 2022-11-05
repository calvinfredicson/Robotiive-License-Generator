import { Box, Button, MenuItem, TextField } from "@mui/material"
import { useCallback, useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { LicenseTypeMap, UserTypeMap } from "stringTemplates"
import { convertComponentType, convertLicenseExpiry, fetchJson } from "Utils"
import {
  InputComponentType,
  InputLicenseExpiry,
  InputUID,
} from "component/inputs"
import { GeneratorWrapper } from "./generatorWrapper"
import { LicenseType, User } from "types"
import { LicenseStringDialog } from "dialogs"

export const LicenseGenerator: React.FC = () => {
  const { control, handleSubmit, reset } =
    useForm<License.GenerateLicense.GenerateLicense>({
      defaultValues: {
        uid: "",
        licenseExpiry: UserTypeMap[User.PARTNER].expiry,
        componentType: [],
        licenseType: LicenseType.SINGLE,
      },
    })

  interface FetchLicense {
    license: string
  }

  interface LicenseInfo {
    uid: string
    license: string
  }

  const [licenseInfo, setLicenseInfo] = useState<LicenseInfo>({
    uid: "",
    license: "",
  })

  const generateLicense = useCallback<
    SubmitHandler<License.GenerateLicense.GenerateLicense>
  >(async ({ uid, licenseExpiry, licenseType, componentType }) => {
    if (!componentType.length) {
      window.alert("Please choose component Type")
      return
    }
    const url = "/api/generateLicense"
    const response = await fetchJson<
      License.API.RequestParameter,
      FetchLicense
    >(url, "POST", {
      uid: uid,
      licenseExpiryDate: convertLicenseExpiry(licenseExpiry),
      licenseType: licenseType.toString(),
      componentType: convertComponentType(componentType),
    })
    if (!response.data) return
    setLicenseInfo({
      uid: uid,
      license: response.data.license,
    })
  }, [])

  return (
    <GeneratorWrapper
      title="License Generator"
      handleSubmit={handleSubmit(generateLicense)}
    >
      <InputUID control={control} />
      <InputLicenseExpiry control={control} />
      <InputComponentType control={control} />
      <Controller
        render={({ field }) => (
          <TextField {...field} label="License Type" fullWidth select>
            {Object.entries(LicenseTypeMap).map(([licenseType, value]) => (
              <MenuItem key={licenseType} value={licenseType}>
                {value}
              </MenuItem>
            ))}
          </TextField>
        )}
        name="licenseType"
        control={control}
      />
      <Box display="flex" flexDirection="column" gap={1}>
        <Button type="submit" fullWidth variant="contained" size="large">
          Generate
        </Button>
      </Box>
      <LicenseStringDialog
        uid={licenseInfo.uid}
        licenseString={licenseInfo.license}
        onClose={reset}
      />
    </GeneratorWrapper>
  )
}
