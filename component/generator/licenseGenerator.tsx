import { GeneratorWrapper } from "./generatorWrapper"
import { useForm } from "react-hook-form"
import { InputName, InputUID } from "component/inputs"
import { Box, Button } from "@mui/material"
import { useCallback, useState } from "react"
import { OperationType } from "types"
import { InputCompany, InputRecordType } from "component/inputs"

interface LicenseGenerator
  extends License.GenerateLicense.GenerateLicenseWithoutRecord {
  name: string
  companyName: string
}

export const LicenseGenerator: React.FC = () => {
  const { control } = useForm<LicenseGenerator>({
    defaultValues: {
      name: "",
      uid: "",
      companyName: "",
    },
  })

  const [functionType, setFunctionType] = useState(OperationType.CREATE)
  const selectFunctionType = useCallback(
    (functionType: OperationType) => setFunctionType(functionType),
    []
  )

  return (
    <GeneratorWrapper title="Generate License">
      <Box display="flex" gap={2}>
        <Button
          onClick={() => selectFunctionType(OperationType.CREATE)}
          fullWidth
          variant="contained"
        >
          Create company
        </Button>
        <Button
          onClick={() => selectFunctionType(OperationType.UPDATE)}
          fullWidth
          variant="contained"
          color="success"
        >
          Update company
        </Button>
      </Box>
      <InputName control={control} />
      <InputUID control={control} />
      <InputCompany control={control} operationType={functionType} />
      <InputRecordType control={control} />
    </GeneratorWrapper>
  )
}
