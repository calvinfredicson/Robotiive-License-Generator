import { OperationType } from "types"
import { InputNewCompany } from "./inputNewCompany"
import { SelectRecordedCompany } from "./selectRecordedCompany"

interface InputCompanyProps extends ReactHookForm.Controller {
  operationType: OperationType
}

export const InputCompany: React.FC<InputCompanyProps> = ({
  operationType,
  control,
}) => {
  if (operationType === OperationType.CREATE)
    return <InputNewCompany control={control} />
  return <SelectRecordedCompany control={control} />
}
