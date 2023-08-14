export function calculateLicenseExpiryDate(licenseActivePeriod: number) {
  const currentDate = new Date()
  return new Date(
    currentDate.setMonth(currentDate.getMonth() + licenseActivePeriod)
  )
}

export async function delay(timeout: number) {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}
