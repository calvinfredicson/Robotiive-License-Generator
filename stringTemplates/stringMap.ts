import {
  ComponentType,
  LicenseType,
  PartnerRecordType,
  RecordType,
  User,
} from "../types"

export const LicenseTypeMap: Record<LicenseType, string> = {
  [LicenseType.SINGLE]: "Single",
  [LicenseType.VOLUME]: "Volume",
}

export const ComponentTypeMap: Record<ComponentType, string> = {
  [ComponentType.RCM]: "RCM",
  [ComponentType.SIDEEX]: "Sideex",
  [ComponentType.PLC]: "PLC",
  [ComponentType.RUNNER]: "Runner",
  [ComponentType.LOGVIEWER]: "Log Viewer",
  [ComponentType.RUNNER_SCHEDULER]: "Runner Scheduler",
  [ComponentType.OPEN_API]: "Open API",
  [ComponentType.ALL]: "All",
}

export const UserTypeMap: Record<User, { type: string; expiry: number }> = {
  [User.PARTNER]: {
    type: "Partner",
    expiry: 3,
  },
  [User.CUSTOMER]: {
    type: "Customer",
    expiry: 1,
  },
}

export const RecordTypeMap: Record<RecordType, string> = {
  [RecordType.CUSTOMER]: "Customer",
  [RecordType.PARTNER]: "Partner",
}

export const PartnerRecordTypeMap: Record<PartnerRecordType, string> = {
  [PartnerRecordType.CUSTOMER]: "Customer",
  [PartnerRecordType.PERSONAL]: "Personal",
}
