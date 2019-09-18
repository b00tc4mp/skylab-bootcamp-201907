import React from 'react'
import logic from '../../logic'
import moment from 'moment'
import { withRouter } from 'react-router-dom'

export default withRouter(function ({ chat, history, friendName }) {

    let lastMessage, date

    // chat.messages.forEach(element => {
    //     if (element.user._id != logic.getUserId()) friendName = element.user.name
    // })

    if (chat.messages.length) {
        lastMessage = chat.messages[chat.messages.length - 1].body
        date = chat.messages[chat.messages.length - 1].date
        date = moment(date).utc().format('DD-MM-YY HH:mm')
    }

    return <>
        <a href="#" onClick={event => {
            event.preventDefault()
            history.push(`/chat/${chat.id}`)
        }}>

            <p>{date}</p>
            <p>{friendName}</p>
            <img className="dog-showcase__img" src="/img/square.jpg"></img>
            <p>{lastMessage}</p>
        </a>
    </>
})