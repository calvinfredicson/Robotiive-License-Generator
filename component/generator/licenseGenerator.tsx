import { GeneratorWrapper } from "./generatorWrapper"
import { useForm } from "react-hook-form"
import { InputName, InputUID, SelectRecordedCompany } from "component/inputs"
import { GenerateLicensePageProps } from "pages/generateLicense"

interface LicenseGenerator
  extends License.GenerateLicense.GenerateLicenseWithoutRecord {
  name: string
  recordedCompany: License.GenerateLicense.RecordedCompanyList[]
}

interface LicenseGeneratorProps extends GenerateLicensePageProps {}

export const LicenseGenerator: React.FC<LicenseGeneratorProps> = ({
  companyList,
}) => {
  const { control } = useForm<LicenseGenerator>({
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
