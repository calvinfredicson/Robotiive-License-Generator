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

export function objectToGoogleSheetRowFormat(
  object: Record<string, string>,
  headerList: string[]
) {
  const googleSheetDataFormat: string[][] = []
  const rowContentList: string[] = []
  headerList.forEach((header) => {
    // TODO fix type
    rowContentList.push((object[header] as any) ?? "")
  })
  googleSheetDataFormat.push(rowContentList)
  return googleSheetDataFormat
}
