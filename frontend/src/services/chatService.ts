const API_URL = import.meta.env.VITE_API_URL

export interface ChatResponse {
  response: string
}

export async function sendMessage(message: string): Promise<ChatResponse> {
  const response = await fetch(`${API_URL}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  })

  if (!response.ok) {
    throw new Error('Failed to send chat message')
  }

  return response.json() as Promise<ChatResponse>
}
