
export interface SystemInfo {
  name: string
  version: string
  status: string
  description: string
}

export async function getSystemInfo(): Promise<SystemInfo> {
  const response = await fetch('http://localhost:8000/api/system')

  if (!response.ok) {
    throw new Error('Failed to fetch system information')
  }

  return response.json() as Promise<SystemInfo>
}
