export async function fetchPlainText(url: string): Promise<string | undefined> {
  const response = await fetch(url)
  if (!response.ok) return
  const data = await response.text()
  return data
}
