import FetchData from "./types"

export async function fetchLicense<T>(
  url: string
): Promise<FetchData.FetchResult<T>> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Something went wrong")
  }
  const licenseString = await response.text()
  return {
    data: licenseString as T,
  }
}
