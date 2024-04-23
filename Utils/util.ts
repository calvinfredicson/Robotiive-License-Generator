export function calculateLicenseExpiryDate(licenseActivePeriod: number) {
  const currentDate = new Date()
  return new Date(
    currentDate.setMonth(currentDate.getMonth() + licenseActivePeriod)
  )
}

export async function delay(timeout: number) {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

export async function customFetch<T>(
  url: string,
  method: "GET" | "POST",
  body?: any
): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  }

  const options: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  }

  const response = await fetch(url, options)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const responseBody = (await response.json()) as T
  return responseBody
}

export function generateLicenseMessageContent(
  uid: string,
  licenseString: string
) {
  const template: string = `Here is your license information:
  
UID: 
${uid}
  
RPA License: 
${licenseString}
`

  return template
}

export function trimDoubleQuotes(str: string) {
  return str.replace(/^"|"$/g, "")
}


export function isValidEmail(email: string) {
  // Regular expression to match email addresses ending with @iscoollab.com
  var regex = /^[a-zA-Z0-9._%+-]+@iscoollab\.com$/
  return regex.test(email)
}