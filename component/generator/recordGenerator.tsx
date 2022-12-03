import { GeneratorWrapper } from "./generatorWrapper"
import { SubmitHandler, useForm, useWatch } from "react-hook-form"
import { InputName, InputPartnerRecordType, InputUID } from "component/inputs"
import { Box, Button } from "@mui/material"
import { useCallback, useMemo, useState } from "react"
import { OperationType } from "types"
import { InputCompany, InputRecordType } from "component/inputs"
import { PartnerRecordTypeMap, RecordTypeMap } from "stringTemplates"

interface LicenseGenerator extends License.GenerateLicense.GenerateLicense {
  name: string
  companyName: string
  recordType: string
  partnerRecordType: string
}

export const RecordGenerator: React.FC = () => {
  const { control, handleSubmit, watch } = useForm<LicenseGenerator>({
    defaultValues: {
      name: "",
      uid: "",
      companyName: "",
      recordType: RecordTypeMap.CUSTOMER,
      partnerRecordType: PartnerRecordTypeMap.PERSONAL,
    },
  })

  console.log(watch())
  const recordType = useWatch({
    control,
    name: "recordType",
  })
  const [functionType, setFunctionType] = useState(OperationType.CREATE)
  const selectFunctionType = useCallback(
    (functionType: OperationType) => setFunctionType(functionType),
    []
  )

  const isPartnerRecord = useMemo(
    () => recordType === RecordTypeMap.PARTNER,
    [recordType]
  )

  const generateLicenseWithRecord = useCallback<
    SubmitHandler<LicenseGenerator>
  >(({ name, uid, companyName, recordType, partnerRecordType }) => {
    console.log({ name, uid, companyName, recordType, partnerRecordType })
  }, [])

  const AppTitle = useMemo(() => {
    if (functionType === OperationType.CREATE) return "Create Company"
    return "Update Company"
  }, [functionType])

  return (
    <GeneratorWrapper
      title={AppTitle}
      handleSubmit={handleSubmit(generateLicenseWithRecord)}
    >
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
      {isPartnerRecord ? <InputPartnerRecordType control={control} /> : null}
      <Box display="flex" flexDirection="column" gap={1}>
        <Button type="submit" fullWidth variant="contained" size="large">
          Generate
        </Button>
      </Box>
    </GeneratorWrapper>
  )
}
