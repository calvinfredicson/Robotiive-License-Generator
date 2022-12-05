import { useEffect, useState } from "react"
import { fetchJson } from "Utils"
import { SelectChineseCompanyName } from "./selectChineseCompanyName"
import { SelectEnglishCompanyName } from "./selectEnglishCompanyName"

export interface SelectRecordedCompanyProps extends ReactHookForm.Controller {}

export const SelectRecordedCompany: React.FC<SelectRecordedCompanyProps> = ({
  ...props
}) => {
  const [companyList, setCompanyList] = useState<Record<string, string>[]>([])

  useEffect(() => {
    const fetchRecordedCompany = async () => {
      const url = "/api/getRecordedCompanyList"
      const companyList = await fetchJson<void, Record<string, string>[]>(
        url,
        "get"
      )
      if (!companyList || !companyList.data) return []
      return setCompanyList(companyList.data)
    }
    try {
      fetchRecordedCompany()
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <>
      <SelectChineseCompanyName companyList={companyList} {...props} />
      <SelectEnglishCompanyName companyList={companyList} {...props} />
    </>
  )
}
