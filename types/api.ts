import { ManualLicenseGeneratorInfo } from "./license"

export interface LicenseRequestParameters
  extends Omit<
    ManualLicenseGeneratorInfo,
    "licenseExpiry" | "licenseType" | "componentType"
  > {
  licenseExpiryDate: string
  licenseType: string
  componentType: string
}

export interface RequestError {
  message: string
}

export interface License {
  license: string
}
