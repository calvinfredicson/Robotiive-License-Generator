import { Box, Button, Typography } from "@mui/material"
import type { NextPage } from "next"
import { useCallback, useState } from "react"
import { fetchJson } from "../Utils"

const testUrl = "http://localhost:3000/api/generateLicense"
const App: NextPage = () => {
  const [licenseString, setLicenseString] = useState("")
  const doFetch = useCallback(async () => {
    const response = await fetchJson<{ license: string }>(testUrl)
    setLicenseString(response.license)
  }, [])

  return (
    <Box>
      <Typography variant="h3">Welcome To NextJS</Typography>
      <code>{licenseString}</code>
      <Button variant="contained" onClick={doFetch}>
        Fetch
      </Button>
    </Box>
  )
}

export default App
