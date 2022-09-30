import { GeneratorWrapper } from "./generatorWrapper"
import { useForm } from "react-hook-form"
import type { CompanyList, ManualLicenseGeneratorInfo } from "types"
import { InputName, InputUID, SelectRecordedCompany } from "component/inputs"
import { GenerateLicensePageProps } from "pages/generateLicense"

interface LicenseGeneratorInfo extends ManualLicenseGeneratorInfo {
  name: string
  recordedCompany: CompanyList[]
}

interface LicenseGeneratorProps extends GenerateLicensePageProps {}

export const LicenseGenerator: React.FC<LicenseGeneratorProps> = ({
  companyList,
}) => {
  const { control } = useForm<LicenseGeneratorInfo>({
    defaultValues: {
      name: "",
      uid: "",
      recordedCompany: [],
    },
  })
  return (
    <GeneratorWrapper title="Generate License">
      <InputName control={control} />
      <InputUID control={control} />
      <SelectRecordedCompany control={control} companyList={companyList} />
    </GeneratorWrapper>
  )
}
