// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { getOwnerList } from "Utils/api"

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const ownerList = await getOwnerList()
  if (!ownerList) return res.status(404).send("Something went wrong!")
  return res.status(200).send(ownerList)
}
