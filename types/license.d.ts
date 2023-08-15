declare namespace License.GenerateLicense {
  interface GenerateLicense {
    uid: string;
    licenseExpiry: number;
    licenseType: number;
    productType: number;
  }

  interface SendEmail {
    uid: string;
    from: string;
    to: string;
    subject: string;
    licenseString: string;
  }
}

declare namespace License.API {
  interface SendEmailBody
    extends Omit<License.GenerateLicense.SendEmail, "licenseString"> {
    emailContent: string;
  }
}
