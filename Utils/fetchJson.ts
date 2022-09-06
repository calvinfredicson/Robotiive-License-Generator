export async function fetchJson<T, K>(
  url: string,
  method: string,
  body?: T
): Promise<K> {
  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(body),
  })
  if (!response.ok) {
    throw new Error("Something went wrong")
  }
  const data = await response.json()
  return data
}
