interface LicenseReturnType {
  data?: string
  error?: License.API.RequestError
}

export async function fetchLicense(url: string): Promise<LicenseReturnType> {
  const response = await fetch(url)
  if (!response.ok) {
    return { error: { message: "something went wrong" } }
  }
  const licenseString = await response.text()
  return {
    data: licenseString,
  }
}
