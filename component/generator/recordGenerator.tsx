import { GeneratorWrapper } from "./generatorWrapper"
import { SubmitHandler, useForm } from "react-hook-form"
import { InputOwnerName, InputProviderName, InputText } from "component/inputs"
import { Box, Button } from "@mui/material"
import { useCallback, useEffect, useMemo, useState } from "react"
import { OperationType } from "types"
import { InputCompany, InputRecordType } from "component/inputs"
import { PartnerRecordTypeMap, RecordTypeMap } from "stringTemplates"
import { fetchJson } from "Utils"
import { useRouter } from "next/router"

interface LicenseGenerator extends License.GenerateLicense.GenerateLicense {
  name: string
  companyName: string
  recordType: string
  ownerName: string
  partnerRecordType: string
  licenseString: string
  robotiiveVersion: string
  providerName: string
  expiryDate: string
}

interface PassedLicenseGeneratedData {
  uid: string
  expiryDate: string
  licenseString: string
}

export const RecordGenerator: React.FC = () => {
  const [companyList, setCompanyList] = useState<License.API.Company[]>([])
  const router = useRouter()
  const passedData = router.query as unknown as PassedLicenseGeneratedData
  useEffect(() => {
    const fetchRecordedCompany = async () => {
      const url = "/api/getRecordedCompanyList"
      const { data: companyList } = await fetchJson<
        void,
        License.API.Company[]
      >(url, "get")
      if (!companyList) return []
      return setCompanyList(companyList)
    }
    try {
      fetchRecordedCompany()
    } catch (err) {
      console.log(err)
    }
  }, [])

  const { control, handleSubmit } = useForm<LicenseGenerator>({
    defaultValues: {
      name: "",
      uid: passedData.uid ?? "",
      licenseString: passedData.licenseString ?? "",
      expiryDate: passedData.expiryDate ?? "",
      ownerName: "",
      companyName: "",
      recordType: RecordTypeMap.CUSTOMER,
      partnerRecordType: PartnerRecordTypeMap.PERSONAL,
      robotiiveVersion: "",
      providerName: "",
    },
  })

  const [functionType, setFunctionType] = useState(OperationType.CREATE)
  const selectFunctionType = useCallback(
    (functionType: OperationType) => setFunctionType(functionType),
    []
  )

  const generateLicenseWithRecord = useCallback<
    SubmitHandler<LicenseGenerator>
  >(
    ({
      name,
      uid,
      ownerName,
      robotiiveVersion,
      providerName,
      companyName,
      recordType,
      partnerRecordType,
      licenseString,
      expiryDate,
    }) => {
      console.log({
        name,
        uid,
        ownerName,
        companyName,
        recordType,
        partnerRecordType,
        robotiiveVersion,
        providerName,
        licenseString,
        expiryDate,
      })
    },
    []
  )

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
      <InputText name="name" control={control} />
      <InputText name="uid" control={control} />
      <InputText name="expiryDate" control={control} />
      <InputText name="licenseString" control={control} />
      <InputText name="robotiiveVersion" control={control} />
      <InputOwnerName control={control} />
      <InputCompany
        control={control}
        companyList={companyList}
        operationType={functionType}
      />
      <InputRecordType control={control} />
      <InputProviderName companyList={companyList} control={control} />
      <Box display="flex" flexDirection="column" gap={1}>
        <Button type="submit" fullWidth variant="contained" size="large">
          Generate Record
        </Button>
      </Box>
    </GeneratorWrapper>
  )
}
