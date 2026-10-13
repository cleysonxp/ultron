import { useState } from 'react'
import { sendMessage } from '../services/chatService'
import './ChatPanel.css'

interface Message {
    role: 'user' | 'assistant'
    content: string
}

function ChatPanel() {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const message = input.trim()

        if (!message || loading) {
            return
        }

        setMessages((current) => [...current, { role: 'user', content: message }])
        setInput('')
        setLoading(true)
        setError(false)

        try {
            const result = await sendMessage(message)

            setMessages((current) => [
                ...current,
                { role: 'assistant', content: result.response },
            ])
        } catch {
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="chat-panel">
            <h2>CHAT WITH ULTRON</h2>

            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div key={index} className={`chat-message ${message.role}`}>
                        <strong>{message.role === 'user' ? 'VOCÊ' : 'ULTRON'}</strong>
                        <p>{message.content}</p>
                    </div>
                ))}

                {loading && <p className="chat-loading">ULTRON ESTÁ PROCESSANDO...</p>}

                {error && (
                    <p className="chat-error">
                        Não foi possível obter uma resposta. Tente novamente.
                    </p>
                )}
            </div>

            <form className="chat-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Digite sua mensagem..."
                    disabled={loading}
                />

                <button type="submit" disabled={loading || !input.trim()}>
                    ENVIAR
                </button>
            </form>
        </section>
    )
}

export default ChatPanel
