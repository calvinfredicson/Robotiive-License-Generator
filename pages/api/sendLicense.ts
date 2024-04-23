import { NextApiRequest, NextApiResponse } from "next"

const lineSendMessageURL = "https://get-line-user-id.vercel.app/api/sendMessage"

export interface SendLicenseRequestBody {
  message: string
  lineUserId: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { message, lineUserId } =
      req.body as SendLicenseRequestBody

    const response = await fetch(lineSendMessageURL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "userOrGroupId": lineUserId,
        "message": message
      })
    })

    const responseData: { message: string } = await response.json()
    if (!response.ok) throw new Error(responseData.message)
    return res.status(200).json(responseData)

  } catch (err) {
    console.error('Error fetching data:', err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
