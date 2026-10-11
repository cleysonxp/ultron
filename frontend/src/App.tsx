
import { useEffect, useState } from 'react'
import './App.css'
import { getSystemInfo, type SystemInfo } from './services/systemService'
import { getWeather, type WeatherInfo } from './services/weatherService'

function App() {
  const [system, setSystem] = useState<SystemInfo | null>(null)
  const [weather, setWeather] = useState<WeatherInfo | null>(null)
  const [systemError, setSystemError] = useState(false)
  const [weatherError, setWeatherError] = useState(false)

  useEffect(() => {
    getSystemInfo()
      .then(setSystem)
      .catch(() => setSystemError(true))

    getWeather()
      .then(setWeather)
      .catch(() => setWeatherError(true))
  }, [])

  const status = systemError
    ? 'SYSTEM OFFLINE'
    : system?.status === 'online'
      ? 'SYSTEM ONLINE'
      : 'CONNECTING...'

  return (
    <main className="ultron">
      <div className="ultron-content">
        <span className="ultron-label">
          ARTIFICIAL INTELLIGENCE
        </span>

        <h1>{system?.name ?? 'ULTRON'}</h1>

        <div className="core-container">
          <div className="core">
            <div className="core-inner" />
          </div>
        </div>

        <span className="ultron-status">{status}</span>

        {system && (
          <div className="system-info">
            <span>VERSION {system.version}</span>
            <p>{system.description}</p>
          </div>
        )}

        <section className="weather-panel">
          <h2>WEATHER</h2>

          {weatherError ? (
            <p>Weather data unavailable</p>
          ) : weather ? (
            <>
              <h3>{weather.location}</h3>
              <p className="weather-temperature">
                {weather.temperature.toLocaleString('pt-BR')}°C
              </p>
              <p>Feels like {weather.feels_like}°C</p>
              <p>Humidity: {weather.humidity}%</p>
              <p>Wind: {weather.wind_speed} km/h</p>
              <p>
                {weather.is_day ? 'DAYTIME' : 'NIGHTTIME'}
              </p>
            </>
          ) : (
            <p>Loading weather...</p>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
