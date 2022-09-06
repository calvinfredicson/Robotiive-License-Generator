// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import type { LicenseRequestParameters } from "../../types"
import { fetchLicense } from "../../Utils"
import type { LicenseStringType } from "../../types"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LicenseStringType>
) {
  if (req.method !== "POST") return
  const { uid, licenseExpiryDate, componentType, licenseType } = JSON.parse(
    req.body
  ) as LicenseRequestParameters
  const url = `https://ops.iscooldev.com/genlicense/${uid}/${licenseExpiryDate}/${licenseType}/${componentType}`
  const licenseString = await fetchLicense<string>(url)
  if (!licenseString || !licenseString.data) return res.status(500)
  return res.status(200).json({ license: licenseString.data })
}
