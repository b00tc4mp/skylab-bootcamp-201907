import React from 'react'
import { withRouter } from 'react-router-dom'
import moment from 'moment'

export default withRouter(function ({ message }) {

    const { date, from, text } = message
    let date2 = date
    date2 = moment(date2).utc().format('DD-MM-YY HH:mm')

    return <ul className = 'message'>
        <li className = 'message_name'>{from.name}</li>
        <li className = 'message_data'>{date2}</li>
        <li className = 'message_text'>{text}</li>
    </ul>
})