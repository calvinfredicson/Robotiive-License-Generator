import { GeneratorWrapper } from "./generatorWrapper"
import { useForm } from "react-hook-form"
import { ManualLicenseGeneratorInfo } from "types"
import { InputName, InputUID } from "component/inputs"
import { GenerateLicensePageProps } from "pages/generateLicense"

interface LicenseGeneratorInfo extends ManualLicenseGeneratorInfo {
  name: string
}

interface LicenseGeneratorProps extends GenerateLicensePageProps {}

export const LicenseGenerator: React.FC<LicenseGeneratorProps> = ({
  companyList,
}) => {
  const { control } = useForm<LicenseGeneratorInfo>({
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
