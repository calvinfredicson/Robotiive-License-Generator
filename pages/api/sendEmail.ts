import { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { from, to, subject, emailContent } =
      req.body as License.API.SendEmailBody
    const send = require("gmail-send")({
      user: from,
      pass: process.env["GMAIL_PASSWORD"],
      to: to,
      subject: subject,
    })

    send(
      {
        text: emailContent,
      },
      (error: string, result: string) => {
        if (error) console.error(error)
        return res.status(200).json({ result: result })
      }
    )
  } catch (err) {
    console.log(err)
    console.log(process.env["GMAIL_PASSWORD"])
    return res.status(500).json({ error: err })
  }
}
