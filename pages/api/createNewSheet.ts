import { NextApiRequest, NextApiResponse } from "next"
import { createNewSheet } from "Utils/api"

interface RequestBody {
  newSheetName: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(404).send("Not found")
  const { newSheetName } = req.body as RequestBody
  const createSheet = await createNewSheet(newSheetName)
  if (!createSheet) return res.status(404).send("operation failed")
  return res.status(200).send("sheet created successfully")
}
