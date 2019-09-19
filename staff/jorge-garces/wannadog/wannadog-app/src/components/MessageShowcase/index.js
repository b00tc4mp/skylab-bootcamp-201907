import React from 'react'
import { withRouter } from 'react-router-dom'
import moment from 'moment'

export default withRouter(function ({ message }) {

    const { date, user, body } = message

    let date2 = date
    date2 = moment(date2).utc().format('DD-MM-YY HH:mm')

    return <ul className="chat-message">
        <div className="chat-message__top">
            <div className="chat-message__date">
                <li>{date2}</li>
            </div>
            <div className="chat-message__name">
                <li className="chat-message__user">{user.name}</li>
            </div>
            <div className="chat-message__body">
                <li>{body}</li>
            </div>
        </div>
    </ul>
})