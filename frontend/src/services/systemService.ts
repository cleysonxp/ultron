const API_URL = import.meta.env.VITE_API_URL

export interface SystemInfo {
  name: string
  version: string
  status: string
  description: string
}

export async function getSystemInfo(): Promise<SystemInfo> {
  const response = await fetch(`${API_URL}/api/system`)

  if (!response.ok) {
    throw new Error('Failed to fetch system information')
  }

  return response.json() as Promise<SystemInfo>
}
