import { google } from "googleapis"
import { googleSheetDataToObject } from "Utils"

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

    if (!companyList.data.values) return
    return googleSheetDataToObject(companyList.data.values)
  } catch (err) {
    console.log(err)
    return
  }
}
