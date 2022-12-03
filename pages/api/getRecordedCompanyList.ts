// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { getRecordedCompanyList } from "Utils/api"

function getUniqueCompanyList(companyList: Record<string, string>[]) {
  return [
    ...new Map(
      companyList.map((companyName) => [
        companyName["Company Chinese Name"],
        companyName,
      ])
    ).values(),
  ]
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const companyList = await getRecordedCompanyList()
  if (!companyList) return res.status(404).send("Something went wrong!")
  return res.status(200).send(getUniqueCompanyList(companyList))
}
