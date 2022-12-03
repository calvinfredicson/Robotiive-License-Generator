import { googleSheetDataToObject } from "Utils"
import { setupGoogleSheetApi } from "Utils/googleApi"

export async function getRecordedProviderList(): Promise<
  Record<string, string>[] | undefined
> {
  try {
    const { googleSheets, auth } = await setupGoogleSheetApi()
    const spreadsheetId = "13bJFQJH3JfoEfvdx2I8KmIXqtRStMTaRbRpmpEUYURM"

    // get recorded company list from google sheets table
    const providerList = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "License Record!K:L",
    })

    if (!providerList.data.values) return
    return googleSheetDataToObject(providerList.data.values)
  } catch (err) {
    console.log(err)
    return
  }
}
