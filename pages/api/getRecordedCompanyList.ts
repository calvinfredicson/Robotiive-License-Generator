// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { getRecordedCompanyList } from "Utils/api"

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const companyList = await getRecordedCompanyList()
  if (!companyList) res.status(404).send("Something went wrong!")
  res.status(200).send(companyList)
}
