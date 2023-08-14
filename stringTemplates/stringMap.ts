import {
  ComponentType,
  LicenseType,
  User
} from "../types"

export const LicenseTypeMap: Record<LicenseType, string> = {
  [LicenseType.SINGLE]: "Single",
  [LicenseType.VOLUME]: "Volume",
}

export const UserTypeMap: Record<User, { type: string, expiry: number }> = {
  [User.CUSTOMER]: {
    type: "Customer",
    expiry: 1,
  },
  [User.PARTNER]: {
    type: "Partner",
    expiry: 3,
  },
  [User.DEAL]: {
    type: "Deal",
    expiry: 12,
  },
}



