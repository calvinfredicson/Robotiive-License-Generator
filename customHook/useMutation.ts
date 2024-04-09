import { useState } from "react"

const useMutation = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error>()

  const mutateData = async (url: string, body: string) => {
    setLoading(true)

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      })

      if (!response.ok) {
        throw new Error("Something went wrong")
      }
      return response
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        setError(error)
      } else {
        setError(new Error("An unknown error occurred"))
      }
      return null
    } finally {
      setLoading(false)
    }
  }

  return { mutateData, loading, error }
}

export default useMutation
