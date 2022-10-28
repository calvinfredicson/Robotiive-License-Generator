export function googleSheetDataToObject(unspecifiedDimensionData: string[][]) {
  const header = unspecifiedDimensionData[0]
  const content = unspecifiedDimensionData.splice(
    1,
    unspecifiedDimensionData.length - 1
  )
  if (!header?.length || !content.length) return
  return content.map((content) => {
    const obj: Record<string, string> = {}
    content.forEach((item, i) => {
      obj[header[i] as string] = item
    })
    return obj
  })
}

export function objectToGoogleSheetData(object: Record<string, string>[]) {
  const googleSheetDataFormat: string[][] = []
  object.forEach((item) => {
    googleSheetDataFormat.push(Object.values(item))
  })
  return googleSheetDataFormat
}
