import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import MessageShowcase from '../MessageShowcase'

export default function ({ chatId }) {

    const [messages, setMessages] = useState()

    useEffect(() => {
        async function autoUpdate() {
            try {
                const response = await logic.retrieveChat(chatId)
                setMessages(response)
            } catch ({ message }) {
                console.log(message)
            }
        }

        setInterval(function () {
            autoUpdate()
        }, 1000)

    }, [])

    async function onChatMessage(_message) {
        try {
            await logic.updateChat(chatId, _message)
        } catch ({ message }) {
            console.log('error', message)
        }
    }

    return <>
        <h3>Conversation</h3>
        {messages && <ul>{messages.map(message => <MessageShowcase message={message} />)}</ul>}

        <form onSubmit={event => {
            event.preventDefault()

            const { target: { _message: { value: _message } } } = event
            onChatMessage(_message)
        }}>
            <input type="text" name="_message" placeholder="Enter your message ..."></input>
            <button>Send</button>
        </form>
    </>
}