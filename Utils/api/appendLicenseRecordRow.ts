import { objectToGoogleSheetRowFormat } from "Utils"
import { setupGoogleSheetApi } from "Utils/googleApi"
import { getRecordHeader } from "./getRecordHeader"

export async function appendLicenseRecordRow(
  startRange: string,
  endRange: string,
  sheetName: string,
  updateData: Record<string, string>
) {
  try {
    const { googleSheets, auth } = await setupGoogleSheetApi()
    const spreadsheetId = "13bJFQJH3JfoEfvdx2I8KmIXqtRStMTaRbRpmpEUYURM"

    // get record header
    const recordHeader = await getRecordHeader(startRange, endRange)
    if (!recordHeader || !recordHeader[0]) return

    console.log(objectToGoogleSheetRowFormat(updateData, recordHeader[0]))
    // append row to spreadsheet
    const googleSheetRange = `${sheetName}!${startRange}:${endRange}`
    const appendRow = await googleSheets.spreadsheets.values.append({
      auth,
      valueInputOption: "RAW",
      spreadsheetId,
      range: googleSheetRange,
      requestBody: {
        values: objectToGoogleSheetRowFormat(updateData, recordHeader[0]),
      },
    })
    if (appendRow.status !== 200) return false
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}
