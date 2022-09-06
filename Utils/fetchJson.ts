export async function fetchJson<T, K>(
  url: string,
  method: string,
  body?: T
): Promise<K | undefined> {
  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(body),
  })
  if (!response.ok) return
  const data = await response.json()
  return data as K
}
