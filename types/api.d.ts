declare namespace License.API {
  interface RequestParameter {
    uid: string
    licenseExpiryDate: string
    componentType: string
    licenseType: string
  }

  interface Response {
    license: string
  }

  interface RequestError {
    message: string
  }
}
