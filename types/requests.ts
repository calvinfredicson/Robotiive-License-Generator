export interface LicenseRequestParameters {
  uid: string
  licenseExpiryDate: string
  licenseType: number
  componentType: string
}

export interface LicenseRequestError {
  message: string
}

export interface LicenseStringType {
  license: string
}
