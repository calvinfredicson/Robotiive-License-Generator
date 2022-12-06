import { SelectChineseCompanyName } from "./selectChineseCompanyName"
import { SelectEnglishCompanyName } from "./selectEnglishCompanyName"

export interface SelectRecordedCompanyProps extends ReactHookForm.Controller {
  companyList: License.API.Company[]
}

export const SelectRecordedCompany: React.FC<SelectRecordedCompanyProps> = ({
  ...props
}) => {
  return (
    <>
      <SelectChineseCompanyName {...props} />
      <SelectEnglishCompanyName {...props} />
    </>
  )
}
