import { google } from "googleapis"

export async function createNewSheet(newSheetName: string) {
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

    // test sheet
    // const spreadsheetId = "1iMTWDGywnELfkTIfkTClK20ZtaSX9AHOGNrV3QqJ5Jg"

    // append row to spreadsheet
    const appendRow = await googleSheets.spreadsheets.batchUpdate({
      spreadsheetId: spreadsheetId,
      requestBody: {
        requests: [
          {
            addSheet: {
              properties: {
                title: newSheetName,
              },
            },
          },
        ],
      },
    })
    if (appendRow.status !== 200) return false
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}
