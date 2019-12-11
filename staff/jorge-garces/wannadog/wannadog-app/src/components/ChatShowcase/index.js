import React from 'react'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import logic from '../../logic'

export default withRouter(function ({ chat, history }) {

    let lastMessage, date, friendName

    if (chat.messages.length) {
        lastMessage = chat.messages[chat.messages.length - 1].body
        date = chat.messages[chat.messages.length - 1].date
        date = moment(date).utc().format('DD-MM-YY HH:mm')
    }

    chat.members.forEach(element => {
        if (element._id !== logic.getUserId()) friendName = (element.name)
    })

    return <section className="lounge">
        <a className="lounge" href="#" onClick={event => {
            event.preventDefault()
            history.push(`/chat/${chat.id}`)
        }}> <div className="lounge__icon">
                <li><i class="lounge__icon fas fa-user"></i></li>
            </div>
            <div className="lounge__text">
                <li className="lounge__date">{date}</li>
                <li className="lounge__name">{friendName}</li>
                <li className="lounge__message">{lastMessage}</li>
            </div>
        </a>
    </section>
})

{/* <img alt="dog-face" className="dog-showcase__img" src="/img/square.jpg"></img> */ }

