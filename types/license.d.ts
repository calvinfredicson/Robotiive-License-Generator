declare namespace License.GenerateLicense {
  interface GenerateLicense {
    uid: string
    licenseExpiry: number
    licenseType: number
    productType: number
  }

  interface SendLicenseMessage {
    uid: string
    lineUserId: string
    licenseString: string
  }

  interface SendLicenseRequestBody extends SendLicenseMessage {
    emailContent: string
  }
}