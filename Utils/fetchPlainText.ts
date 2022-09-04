export async function fetchPlainText(url: string) {
  const response = await fetch(url)
  if (!response.ok) {
    console.log(`An error has occurred: ${response.status}`)
  }
  const data = await response.text()
  return data
}
