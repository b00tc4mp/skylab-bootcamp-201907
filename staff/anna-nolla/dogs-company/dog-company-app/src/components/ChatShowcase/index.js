import React from 'react'
import moment from 'moment'
import { withRouter } from 'react-router-dom'

export default withRouter(function ({ chat, history, user}) {

    let friendName, lastMessage, date, participantName

    chat.messages.forEach(element => {
        if (element.from._id) friendName = element.from.name
    })

    chat.participants.forEach(element => {
        if (element.id !== user._id) participantName = element.name
    })
    
    if(chat.messages.length > 0) {
        lastMessage = chat.messages[chat.messages.length - 1].text
        date = chat.messages[chat.messages.length - 1].date
        date = moment(date).utc().format('DD-MM-YY HH:mm')}

    return <section className = 'main-chats' onClick={event => {
            event.preventDefault()
            history.push(`/chat/${chat.id}`)
        }}>
        <p className = 'main-chats_text'>{participantName}</p>
        <div className = 'main-chats_message'>
                <p className = 'main-chats_text-last'>{friendName}</p>
            <div>
                <p className = 'main-chats_text'>{date}</p>
                <p className = 'main-chats_text'>{lastMessage}</p>
            </div>
        </div>
    </section >
})