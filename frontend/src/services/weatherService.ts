
const API_URL = import.meta.env.VITE_API_URL

export interface WeatherInfo {
  location: string
  temperature: number
  feels_like: number
  humidity: number
  wind_speed: number
  weather_code: number
  is_day: boolean
}

export async function getWeather(): Promise<WeatherInfo> {
  const response = await fetch(`${API_URL}/api/weather`)

  if (!response.ok) {
    throw new Error('Failed to fetch weather information')
  }

  return response.json() as Promise<WeatherInfo>
}
