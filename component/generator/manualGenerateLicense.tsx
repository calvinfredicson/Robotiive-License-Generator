import { Box, Button, MenuItem, TextField } from "@mui/material"
import { useCallback } from "react"

import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { LicenseTypeMap, UserTypeMap } from "stringTemplates"
import {
  License,
  LicenseRequestParameters,
  LicenseType,
  ManualLicenseGeneratorInfo,
  User,
} from "types"
import { convertComponentType, convertLicenseExpiry, fetchJson } from "Utils"
import {
  InputComponentType,
  InputLicenseExpiry,
  InputUID,
} from "component/inputs"
import { GeneratorWrapper } from "./generatorWrapper"

export const ManualLicenseGenerator = () => {
  const { control, handleSubmit, reset } = useForm<ManualLicenseGeneratorInfo>({
    defaultValues: {
      uid: "",
      licenseExpiry: UserTypeMap[User.PARTNER].expiry,
      componentType: [],
      licenseType: LicenseType.SINGLE,
    },
  })

  const generateLicense = useCallback<
    SubmitHandler<ManualLicenseGeneratorInfo>
  >(
    async ({ uid, licenseExpiry, licenseType, componentType }) => {
      if (!componentType.length) {
        window.alert("Please choose component Type")
        return
      }
      const url = "/api/generateLicense"
      const response = await fetchJson<LicenseRequestParameters, License>(
        url,
        "POST",
        {
          uid: uid,
          licenseExpiryDate: convertLicenseExpiry(licenseExpiry),
          licenseType: licenseType.toString(),
          componentType: convertComponentType(componentType),
        }
      )
      if (!response.data) return
      await navigator.clipboard.writeText(
        `UID:\n${uid}\n\nLicense:\n${response.data.license}`
      )
      reset()
      window.alert(
        "Your license is successfully generated and copied to your clipboard"
      )
    },
    [reset]
  )

  return (
    <GeneratorWrapper
      title="Manual License Generator"
      handleSubmit={handleSubmit(generateLicense)}
    >
      <InputUID control={control} />
      <InputLicenseExpiry control={control} />
      <Controller
        render={({ field }) => <InputComponentType {...field} />}
        name="componentType"
        control={control}
      />
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
    </GeneratorWrapper>
  )
}
