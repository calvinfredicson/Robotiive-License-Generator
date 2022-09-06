export interface LicenseRequestParameters {
  uid: string
  licenseExpiryDate: string
  licenseType: number
  componentType: string
}

export interface RequestError {
  message: string
}

export interface License {
  license: string
}
