import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import MessageShowcase from '../MessageShowcase'
import { withRouter } from 'react-router-dom'

export default withRouter(function ({ chatId, history }) {

    const [messages, setMessages] = useState()

    let interval

    useEffect(() => {
        async function autoUpdate() {
            try {
                const response = await logic.retrieveChat(chatId)

                setMessages(response)
            } catch ({ message }) {
                console.log(message)
            }
        }

        interval = setInterval(function () {
            autoUpdate()
        }, 1000)

        return () => clearInterval(interval)

    }, [])

    async function onChatMessage(_message) {
        try {
            await logic.updateChat(chatId, _message)
        } catch ({ message }) {
            console.log('error', message)
        }
    }

    const goBack = () => {
        history.go(-1)
    }

    return <>
        <a href="#" onClick={goBack}>Back</a>
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
})