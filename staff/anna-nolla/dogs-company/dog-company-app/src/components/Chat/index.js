import React, { useState, useEffect, useContext } from 'react'
import logic from '../../logic'
import MessageShowcase from '../MessageShowcase'
import { withRouter } from 'react-router-dom'
import MyContext from '../Provider-Context'

export default withRouter(function ({ chatId }) {

    const [messages, setMessages] = useState()
    const { setView, setUser } = useContext(MyContext)

    useEffect(() => {
        async function autoUpdate() {
            try {
                const { user }= await logic.retrieveUser()
                const response  = await logic.retrieveChat(chatId.toString())
                setMessages(response)
                setUser(user)
                setView('chat')
            } catch ({ message }) {
                
            }
        }
        const interval = setInterval(() => {
            autoUpdate()
        }, 1000)
        return() => clearInterval(interval)

    }, [messages])

    async function onChatMessage(_message) {
        try { 
            await logic.updateChat(chatId.toString(), _message)
        } catch ({ message }) {
            console.log('error', message)
        }
    }

    return <div className = "chat">
        <h3 className = 'chat_title'>Conversation</h3>
        
        {messages && <ul>{messages.map(message => <MessageShowcase key ={message.date} message={message} />)}</ul>}

        <form className = 'chat_form' onSubmit={event => {
            event.preventDefault()
            const { target: { _message: { value: _message } } } = event
            onChatMessage(_message)
        }}>
            <input className = 'chat_form_input' type="text" name="_message" placeholder="Enter your message ..."></input>
            <button className = 'chat_form_button'>Send</button>
        </form>
    </div>
})