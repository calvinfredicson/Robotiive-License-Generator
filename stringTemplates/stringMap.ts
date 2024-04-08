import {
  Features,
  LicenseType,
  ProductType,
  User
} from "../types"

export const LicenseTypeMap: Record<LicenseType, string> = {
  [LicenseType.SINGLE]: "Single",
  [LicenseType.VOLUME]: "Volume",
}

export const UserTypeMap: Record<User, { type: string, expiry: number | string }> = {
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
  [User.CUSTOM]: {
    type: "Custom",
    expiry: "Custom Expiry"
  }
}

export const ProductTypeMap: Record<ProductType, { productTypeName: string, productTypeCode: number }> = {
  [ProductType.EXECUTOR]: {
    productTypeName: "Executor",
    productTypeCode: ProductType.EXECUTOR
  },
  [ProductType.BASIC]: {
    productTypeName: "Basic",
    productTypeCode: ProductType.BASIC
  },
  [ProductType.PREMIUM]: {
    productTypeName: "Premium",
    productTypeCode: ProductType.PREMIUM
  },
  [ProductType.PROFESSIONAL]: {
    productTypeName: "Professional",
    productTypeCode: ProductType.PROFESSIONAL
  }
}

export const FeatureList: Record<Features, { featureName: string, route: string }> = {
  [Features.GENERATE_LICENSE]: {
    featureName: "Generate RPA License",
    route: "/generateLicense"
  },
  [Features.SEND_EMAIL]: {
    featureName: "Send License Email",
    route: "/sendEmail"
  }
}
