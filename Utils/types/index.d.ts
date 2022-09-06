declare namespace FetchData {
  export interface FetchError extends Error {
    status: number
    statusText: string
  }

  export interface FetchResult<T> {
    data?: T
    error?: FetchError
  }
}

export = FetchData
