import { SendLicenseMessage } from "component"
import { useRouter } from "next/router"

const sendMessage: React.FC = () => {
  const { push, query } = useRouter()
  if (!query) {
    push("/generateLicense")
  }

  const uid = query["uid"] as string
  const licenseString = query["licenseString"] as string
  return <SendLicenseMessage licenseString={licenseString} uid={uid} />
}

export default sendMessage
