import { SendLicenseEmail } from "component";
import { useRouter } from "next/router";

const sendEmail = () => {
  const { push, query } = useRouter();
  if (!query) {
    push("/generateLicense");
  }
  const uid = query["uid"] as unknown as string;
  return <SendLicenseEmail uid={uid} />;
};

export default sendEmail;
