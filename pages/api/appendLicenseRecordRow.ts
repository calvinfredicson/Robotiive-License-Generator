import { NextApiRequest, NextApiResponse } from "next"
import { appendLicenseRecordRow } from "Utils/api"

interface RequestBody {
  startRange: number
  endRange: number
  sheetName: string
  updateData: Record<string, string>[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  if (req.method !== "POST") return res.status(404).send("Not found")
  const { startRange, endRange, updateData, sheetName } =
    req.body as RequestBody
  const appendResponse = await appendLicenseRecordRow(
    startRange,
    endRange,
    sheetName,
    updateData
  )
  if (!appendResponse) return res.status(404).send("Not Found")
  res.status(200).send("updated successfully")
}
