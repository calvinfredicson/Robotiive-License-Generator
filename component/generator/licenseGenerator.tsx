import { Box, Button, MenuItem, TextField } from "@mui/material"
import { useCallback, useState } from "react"
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form"
import { LicenseTypeMap, UserTypeMap } from "stringTemplates"
import {
  convertComponentType,
  calculateLicenseExpiryDate,
  fetchJson,
} from "Utils"
import {
  InputComponentType,
  InputLicenseExpiry,
  InputUID,
} from "component/inputs"
import { GeneratorWrapper } from "./generatorWrapper"
import { LicenseType, User } from "types"
import { LicenseDialog } from "dialogs"
import dateFormat from "dateformat"
import { useRouter } from "next/router"

interface FetchLicense {
  license: string
}

export interface LicenseInfo {
  uid: string
  license: string
}

export const LicenseGenerator: React.FC = () => {
  const router = useRouter()
  const { control, handleSubmit, reset } =
    useForm<License.GenerateLicense.GenerateLicense>({
      defaultValues: {
        uid: "",
        licenseExpiry: UserTypeMap[User.PARTNER].expiry,
        componentType: [],
        licenseType: LicenseType.SINGLE,
      },
    })
  const [dialogOpen, setDialogOpen] = useState(false)
  const handleDialogClose = useCallback(() => setDialogOpen(false), [])
  const [licenseInfo, setLicenseInfo] = useState<LicenseInfo>({
    uid: "",
    license: "",
  })
  const [uid, licenseExpiry] = useWatch({
    control,
    name: ["uid", "licenseExpiry"],
  })
  const navigateToGenerateLicenseRecord = useCallback(() => {
    if (!licenseInfo.license) return
    router.push({
      pathname: "/generateLicenseRecord",
      query: {
        uid: uid,
        licenseExpiry: dateFormat(
          calculateLicenseExpiryDate(licenseExpiry),
          "dd/mm/yyyy"
        ),
        licenseString: licenseInfo.license,
      },
    })
  }, [licenseExpiry, licenseInfo.license, router, uid])

  const generateLicense = useCallback<
    SubmitHandler<License.GenerateLicense.GenerateLicense>
  >(async ({ uid, licenseExpiry, licenseType, componentType }) => {
    if (!componentType.length) {
      window.alert("Please choose component Type")
      return
    }
    setDialogOpen(true)
    const url = "/api/generateLicense"
    const response = await fetchJson<
      License.API.RequestParameter,
      FetchLicense
    >(url, "POST", {
      uid: uid,
      licenseExpiryDate: dateFormat(
        calculateLicenseExpiryDate(licenseExpiry),
        "yyyy-mm-dd"
      ),
      licenseType: licenseType.toString(),
      componentType: convertComponentType(componentType),
    })
    if (!response.data) return
    setLicenseInfo({
      uid: uid,
      license: response.data.license,
    })
  }, [])

  const handleReset = useCallback(() => reset(), [reset])

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
        <Button
          fullWidth
          color="success"
          variant="contained"
          size="large"
          disabled={!licenseInfo.license}
          onClick={navigateToGenerateLicenseRecord}
        >
          Update Record
        </Button>
        <Button
          fullWidth
          color="error"
          variant="contained"
          size="large"
          onClick={handleReset}
        >
          Reset
        </Button>
      </Box>
      <LicenseDialog
        open={dialogOpen}
        displayContent={licenseInfo}
        handleDialogClose={handleDialogClose}
      />
    </GeneratorWrapper>
  )
}
