import { MenuItem, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Controller } from "react-hook-form"
import { fetchJson } from "Utils"

export interface InputOwnerNameProps extends ReactHookForm.Controller {}

interface OwnerName {
  Owner: string
}

export const InputOwnerName: React.FC<InputOwnerNameProps> = ({ ...props }) => {
  const [ownerList, setOwnerList] = useState<OwnerName[]>([])
  useEffect(() => {
    const fetchOwnerList = async () => {
      const url = "/api/getOwnerList"
      const { data: ownerList } = await fetchJson<void, OwnerName[]>(url, "get")
      if (!ownerList) return []
      return setOwnerList(ownerList)
    }

    try {
      fetchOwnerList()
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
          label="Select License Owner Name"
          fullWidth
          select
        >
          {ownerList.map((owner) => (
            <MenuItem key={owner.Owner} value={owner.Owner}>
              {owner.Owner}
            </MenuItem>
          ))}
          {!ownerList.length ? (
            <MenuItem>
              <Typography>Fetching data...</Typography>
            </MenuItem>
          ) : null}
        </TextField>
      )}
      name="ownerName"
      {...props}
    />
  )
}
