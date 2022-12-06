declare namespace License.API {
  interface RequestParameter {
    uid: string
    licenseExpiryDate: string
    componentType: string
    licenseType: string
  }

  interface Company {
    "Company Chinese Name": string
    "Company English Name": string
  }

  interface Response {
    license: string
  }

  interface RequestError {
    message: string
  }
}
