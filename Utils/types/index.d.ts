import { RequestError } from "../types"

declare namespace FetchData {
  export interface FetchResult<T> {
    data?: T
    error?: RequestError
  }
}

export = FetchData
