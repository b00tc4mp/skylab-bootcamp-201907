import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import MessageShowcase from '../MessageShowcase'
import { withRouter, Link } from 'react-router-dom'

export default withRouter(function ({ chatId, history }) {

    const [messages, setMessages] = useState(undefined)
    const [friendName, setFriendName] = useState(undefined)
    const [message, setMessage] = useState(undefined)

    let interval

    useEffect(() => {
        async function autoUpdate() {
            try {

                const response = await logic.retrieveChat(chatId)
                setMessages(response)

                response.forEach(element => {
                    if (element.user._id != logic.getUserId()) setFriendName(element.user.name)

                })
            } catch ({ message }) {
                console.log(message)
            }
        }

        interval = setInterval(function () {
            autoUpdate()
        }, 1000)

        return () => clearInterval(interval)

    }, [])


    async function onChatMessage(message) {
        try {
            await logic.updateChat(chatId, message)
            setMessage('')
        } catch ({ message }) {
            console.log('error', message)
        }
    }

    return <>
        <Link onClick={() => history.go(-1)} className="back"><i class="fas fa-arrow-left"></i></Link>

        {messages && friendName && <><h2 className="container__title title-search">{friendName}</h2>
            <ul>
                {messages.map(message => <MessageShowcase message={message} friendName={friendName} />)}
            </ul>
        </>}

        <form onSubmit={event => {
            event.preventDefault()

            onChatMessage(message)
        }}>
            <input type="text" name="message" placeholder="Enter your message ..." value={message} onChange={event => setMessage(event.target.value)}></input>
            <button>Send</button>
        </form>
    </>
})