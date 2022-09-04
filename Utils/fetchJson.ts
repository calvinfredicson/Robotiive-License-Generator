export async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url)
  if (!response.ok) {
    console.log(`An error has occurred: ${response.status}`)
  }
  const data = await response.json()
  return data
}
