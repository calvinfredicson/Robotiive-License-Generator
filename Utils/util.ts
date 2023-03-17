import { ComponentType } from "../types"
import { ComponentTypeMap } from "../stringTemplates"

export function calculateLicenseExpiryDate(licenseActivePeriod: number) {
  const currentDate = new Date()
  return new Date(
    currentDate.setMonth(currentDate.getMonth() + licenseActivePeriod)
  )
}

export function convertComponentType(componentString: string[]) {
  const validComponentTypeList: string[] = []
  componentString.forEach((componentType) => {
    const componentTypeId = Object.keys(ComponentTypeMap).find(
      (key) =>
        ComponentTypeMap[key as unknown as ComponentType] === componentType
    )
    if (componentTypeId) {
      validComponentTypeList.push(componentTypeId)
    }
  })
  return validComponentTypeList.toString()
}

export async function delay(timeout: number) {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}