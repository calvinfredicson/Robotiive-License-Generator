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

function removeAfterCharacter(inputString: string, character: string) {
  const index = inputString.indexOf(character)
  if (index !== -1) {
    return inputString.substring(0, index)
  }
  return inputString
}

export function generateEmailContent(
  to: string,
  uid: string,
  licenseString: string
) {
  const template: string = `
Hi ${removeAfterCharacter(to, "@")},
  
Here is your license information:
  
UID: 
${uid}
  
RPA License: 
${licenseString}

Thank you for choosing Robotiive. 

Sincerely,
Robotiive Bot
`

  return template
}

export function trimDoubleQuotes(str: string) {
  return str.replace(/^"|"$/g, "")
}
