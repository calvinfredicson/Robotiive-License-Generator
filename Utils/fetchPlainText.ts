export async function fetchPlainText(url: string) {
  try {
    const response = await fetch(url)
    if (!response.ok) return
    const data = await response.text()
    return data
  } catch (error) {
    console.error(`Error Occurred Reason: ${error}`)
  }
}
