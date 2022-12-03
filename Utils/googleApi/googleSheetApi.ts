import { google } from "googleapis"

export async function setupGoogleSheetApi() {
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
  return { googleSheets, auth }
}
