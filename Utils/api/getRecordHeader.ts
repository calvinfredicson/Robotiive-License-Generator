import { setupGoogleSheetApi } from "Utils/googleApi"

export async function getRecordHeader(
  startRange: string,
  endRange: string
): Promise<string[][] | undefined> {
  try {
    const { googleSheets, auth } = await setupGoogleSheetApi()
    const spreadsheetId = "13bJFQJH3JfoEfvdx2I8KmIXqtRStMTaRbRpmpEUYURM"

    // get recorded company list from google sheets table
    const companyList = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: `License Record!${startRange}:${endRange}`,
    })

    if (!companyList.data.values) return
    return companyList.data.values
  } catch (err) {
    console.log(err)
    return
  }
}
