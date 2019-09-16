import React from 'react'
import logic from '../../logic'
import moment from 'moment'
import { withRouter } from 'react-router-dom'

export default withRouter(function ({ chat, history }) {

    let friendName, lastMessage, date

    chat.messages.forEach(element => {
        if (element.user._id != logic.getUserId()) friendName = element.user.name
    })

    lastMessage = chat.messages[chat.messages.length - 1].body
    date = chat.messages[chat.messages.length - 1].date
    date = moment(date).utc().format('DD-MM-YY HH:mm')

    return <>
        <p>{date}</p>
        <a href="#" onClick={event => {
            event.preventDefault()
            history.push(`/chat/${chat.id}`)
        }}>{friendName}</a>
        <p>{lastMessage}</p>
    </>
})