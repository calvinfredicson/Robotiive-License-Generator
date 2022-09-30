// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { google } from "googleapis"

function googleSheetDataToObject(unspecifiedDimensionData: string[][]) {
  const header = unspecifiedDimensionData[0]
  const content = unspecifiedDimensionData.splice(
    1,
    unspecifiedDimensionData.length - 1
  )
  if (!header?.length || !content.length) return
  return content.map((content) => {
    const obj: Record<string, string> = {}
    content.forEach((item, i) => {
      obj[header[i] as string] = item
    })
    return obj
  })
}

export async function getRecordedCompanyList(): Promise<
  Record<string, string>[] | undefined
> {
  try {
    const auth = await new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env["CLIENT_EMAIL"],
        private_key: process.env["PRIVATE_KEY"],
      },
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    })

    // create client instance for auth
    const client = await auth.getClient()
    const googleSheets = google.sheets({ version: "v4", auth: client })
    const spreadsheetId = "13bJFQJH3JfoEfvdx2I8KmIXqtRStMTaRbRpmpEUYURM"

    // read row from spreadsheet
    const companyList = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "Company Lists!A:B",
    })

    if (!companyList.data.values) return []
    return googleSheetDataToObject(companyList.data.values)
  } catch (err) {
    console.log(err)
    return
  }
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const companyList = await getRecordedCompanyList()
  if (!companyList) res.send("Something went wrong")
  res.json(companyList)
}
