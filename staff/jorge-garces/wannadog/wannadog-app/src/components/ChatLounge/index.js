import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import ChatShowcase from '../ChatShowcase'
import { withRouter, Link } from 'react-router-dom'

export default withRouter(function ({ history }) {

    const [chatList, setChatList] = useState(undefined)
    const [friendName, setFriendName] = useState(undefined)

    useEffect(() => {

        (async function retrieveChats() {
            try {

                const chats = await logic.retrieveAllChats()
                setChatList(chats)

            } catch ({ message }) {
                console.log(message)
            }
        })()
    }, [history.location])

    return <section className="body">
        <Link className="back" to="/profile"><i class="fas fa-arrow-left"></i></Link>
        <h2 className="container__title">Messages</h2>
        {!chatList && <section className="noresults"> <i class="noresults__sign fas fa-exclamation-triangle"></i> <h3 className="noresults__text">No messages yet</h3>
        </section>
        }
        {chatList && <section><ul>{chatList.map(chat => <ChatShowcase chat={chat} />)}</ul></section>}
    </section >
})