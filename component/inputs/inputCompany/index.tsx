import { OperationType } from "types"
import { InputText } from "../inputText"
import { SelectRecordedCompany } from "./selectRecordedCompany"

interface InputCompanyProps extends ReactHookForm.Controller {
  operationType: OperationType
  companyList: License.API.Company[]
}

export const InputCompany: React.FC<InputCompanyProps> = ({
  operationType,
  companyList,
  control,
}) => {
  if (operationType === OperationType.CREATE)
    return <InputText name="companyName" control={control} />
  return <SelectRecordedCompany control={control} companyList={companyList} />
}
