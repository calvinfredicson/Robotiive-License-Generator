import { GenerateLicensePageProps } from "../../pages/generateLicense"
import React from "react"
import { GeneratorWrapper } from "./generatorWrapper"
import { InputName, InputUID } from "../inputs"
import { useForm } from "react-hook-form"
import { ManualLicenseGeneratorInfo } from "../../types"

interface LicenseGeneratorInfo extends ManualLicenseGeneratorInfo {
  name: string
}

interface LicenseGeneratorProps extends GenerateLicensePageProps {}

export const LicenseGenerator: React.FC<LicenseGeneratorProps> = ({
  companyList,
}) => {
  const { control, handleSubmit, reset } = useForm<LicenseGeneratorInfo>({
    defaultValues: {
      name: "",
      uid: "",
    },
  })
  console.log(companyList)
  return (
    <GeneratorWrapper title="Generate License">
      <InputName control={control} />
      <InputUID control={control} />
    </GeneratorWrapper>
  )
}
