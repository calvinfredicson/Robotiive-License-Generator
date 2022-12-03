import { googleSheetDataToObject } from "Utils"
import { setupGoogleSheetApi } from "Utils/googleApi"

export async function getRecordedCompanyList(): Promise<
  Record<string, string>[] | undefined
> {
  try {
    const { googleSheets, auth } = await setupGoogleSheetApi()
    const spreadsheetId = "13bJFQJH3JfoEfvdx2I8KmIXqtRStMTaRbRpmpEUYURM"

    // get recorded company list from google sheets table
    const companyList = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "License Record!A:B",
    })

    if (!companyList.data.values) return
    return googleSheetDataToObject(companyList.data.values)
  } catch (err) {
    console.log(err)
    return
  }
}
