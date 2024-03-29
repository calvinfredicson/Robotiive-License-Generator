import { SendLicenseEmail } from "component"
import { useRouter } from "next/router"

const sendEmail = () => {
  const { push, query } = useRouter()
  if (!query) {
    push("/generateLicense")
  }

  const uid = query["uid"] as string
  const licenseString = query["licenseString"] as string
  return <SendLicenseEmail licenseString={licenseString} uid={uid} />
}

export default sendEmail
