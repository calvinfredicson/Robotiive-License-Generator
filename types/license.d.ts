declare namespace License.GenerateLicense {
  interface GenerateLicenseWithoutRecord {
    uid: string
    licenseExpiry: number
    licenseType: number
    componentType: string[]
  }

  interface RecordedCompanyList {
    "Company Name": string
    Type: string
  }
}
