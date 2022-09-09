import dateFormat from "dateformat"
import { ComponentType } from "../types"
import { ComponentTypeMap } from "../stringTemplates"

export function convertLicenseExpiry(licenseExpiry: number) {
  return dateFormat(
    new Date(new Date().setMonth(new Date().getMonth() + licenseExpiry)),
    "yyyy-mm-dd"
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
