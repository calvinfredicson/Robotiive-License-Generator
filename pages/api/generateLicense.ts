// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import type { License, LicenseRequestParameters } from "types"
import { fetchLicense } from "Utils"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<License>
) {
  if (req.method !== "POST") return
  const { uid, licenseExpiryDate, componentType, licenseType } = JSON.parse(
    req.body
  ) as LicenseRequestParameters
  const url = `https://ops.iscooldev.com/genlicense/${uid}/${licenseExpiryDate}/${licenseType}/${componentType}`
  const licenseString = await fetchLicense(url)
  if (!licenseString || !licenseString.data) return res.status(500)
  return res.status(200).json({ license: licenseString.data })
}
