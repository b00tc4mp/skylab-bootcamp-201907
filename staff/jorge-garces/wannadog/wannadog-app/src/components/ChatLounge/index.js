import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import ChatShowcase from '../ChatShowcase'
import { withRouter, Link } from 'react-router-dom'

export default withRouter(function ({ history }) {

    const [chatList, setChatList] = useState(undefined)

    useEffect(() => {

        (async function retrieveChats() {
            try {
                const chats = await logic.retrieveAllChats()
                setChatList(chats)
            } catch ({ message }) {
                console.log('error', message)
            }
        })()
    }, [history.location])

    return <section className="body">
        <Link className="back" to="/profile"><i class="fas fa-arrow-left"></i></Link>
        <h2 className="container__title">Messages</h2>
        {chatList && <ul>{chatList.map(chat => <ChatShowcase chat={chat} />)}</ul>}
    </section>
})