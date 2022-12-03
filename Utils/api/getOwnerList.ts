import { googleSheetDataToObject } from "Utils"
import { setupGoogleSheetApi } from "Utils/googleApi"

export async function getOwnerList(): Promise<
  Record<string, string>[] | undefined
> {
  try {
    const { googleSheets, auth } = await setupGoogleSheetApi()
    const spreadsheetId = "13bJFQJH3JfoEfvdx2I8KmIXqtRStMTaRbRpmpEUYURM"

    // get owner list from googleSheet table
    const ownerList = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "License Owner!A:B",
    })

    if (!ownerList.data.values) return
    return googleSheetDataToObject(ownerList.data.values)
  } catch (err) {
    console.log(err)
    return
  }
}
