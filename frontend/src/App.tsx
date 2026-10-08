
import { useEffect, useState } from 'react'
import './App.css'
import { getSystemInfo, type SystemInfo } from './services/systemService'

function App() {
  const [system, setSystem] = useState<SystemInfo | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    getSystemInfo()
      .then((data) => {
        setSystem(data)
      })
      .catch(() => {
        setError(true)
      })
  }, [])

  const status = error
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
      </div>
    </main>
  )
}

export default App
