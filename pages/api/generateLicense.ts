// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { fetchPlainText } from "../../Utils"

type License = {
  license: string
  message: string
}

export default async function handler(res: NextApiResponse<Partial<License>>) {
  const url =
    "https://ops.iscooldev.com/genlicense/24597616-9bb8-407d-9861-5375ce070716/2022-04-04/0/-1"
  const license = await fetchPlainText(url)
  if (!license)
    return res.status(500).json({ message: "something went wrong!" })
  return res.status(200).json({ license })
}
