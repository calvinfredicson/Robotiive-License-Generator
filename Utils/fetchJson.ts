export async function fetchJson<T>(url: string): Promise<T | undefined> {
  try {
    const response = await fetch(url)
    if (!response.ok) return
    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Error Occurred Reason: ${error}`)
  }
}
