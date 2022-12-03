import { MenuItem, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Controller } from "react-hook-form"
import { fetchJson } from "Utils"

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
    <Controller
      render={({ field }) => (
        <TextField
          {...field}
          required
          label="Select Recorded Company"
          fullWidth
          select
        >
          {companyList.map((company) => (
            <MenuItem
              key={company["Company Chinese Name"]}
              value={company["Company Chinese Name"]}
            >
              {company["Company English Name"]} (
              {company["Company Chinese Name"]})
            </MenuItem>
          ))}
          {!companyList.length ? (
            <MenuItem>
              <Typography>Fetching data...</Typography>
            </MenuItem>
          ) : null}
        </TextField>
      )}
      name="companyName"
      {...props}
    />
  )
}
