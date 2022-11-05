declare namespace License.GenerateLicense {
  interface GenerateLicense {
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
