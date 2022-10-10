export const enum LicenseType {
  SINGLE = 0,
  VOLUME = 1,
}

export const enum ComponentType {
  ALL = -1,
  RCM = 0,
  SIDEEX = 1,
  PLC = 2,
  RUNNER = 3,
  LOGVIEWER = 4,
  RUNNER_SCHEDULER = 5,
  OPEN_API = 6,
}

export const enum User {
  PARTNER = 0,
  CUSTOMER = 1,
}

export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
}

export enum PartnerRecordType {
  PERSONAL = "personal",
  CUSTOMER = "customer",
}

export enum RecordType {
  CUSTOMER = 0,
  PARTNER = 1,
}
