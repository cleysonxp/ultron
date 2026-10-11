
import type { WeatherInfo } from '../services/weatherService'

interface WeatherPanelProps {
  weather: WeatherInfo | null
  error: boolean
}

function getWeatherDescription(code: number): string {
  if (code === 0) return 'Céu limpo'
  if (code === 1) return 'Predominantemente limpo'
  if (code === 2) return 'Parcialmente nublado'
  if (code === 3) return 'Nublado'
  if ([45, 48].includes(code)) return 'Neblina'
  if ([51, 53, 55, 56, 57].includes(code)) return 'Garoa'
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'Chuva'
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'Neve'
  if ([95, 96, 99].includes(code)) return 'Trovoada'
  return 'Condição desconhecida'
}

function WeatherPanel({ weather, error }: WeatherPanelProps) {
  return (
    <section className="weather-panel">
      <h2>WEATHER</h2>

      {error ? (
        <p>Weather data unavailable</p>
      ) : weather ? (
        <>
          <h3>{weather.location}</h3>

          <p className="weather-temperature">
            {weather.temperature.toLocaleString('pt-BR')}°C
          </p>

          <p>{getWeatherDescription(weather.weather_code)}</p>
          <p>Sensação térmica: {weather.feels_like}°C</p>
          <p>Umidade: {weather.humidity}%</p>
          <p>Vento: {weather.wind_speed} km/h</p>
          <p>{weather.is_day ? 'Dia' : 'Noite'}</p>
        </>
      ) : (
        <p>Carregando clima...</p>
      )}
    </section>
  )
}

export default WeatherPanel
