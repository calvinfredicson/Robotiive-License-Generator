import { RequestError } from "../types"

interface ResponseType<T> {
  data?: T
  error?: RequestError
}

export async function fetchJson<T, K>(
  url: string,
  method: string,
  body?: T
): Promise<ResponseType<K>> {
  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(body),
  })
  if (!response.ok) {
    return { error: { message: "Something went wrong" } }
  }
  const data = await response.json()
  return { data }
}
