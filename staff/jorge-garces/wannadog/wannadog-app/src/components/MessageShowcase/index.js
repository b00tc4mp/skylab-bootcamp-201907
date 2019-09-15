import React from 'react'
import { withRouter } from 'react-router-dom'
import moment from 'moment'

export default withRouter(function ({ message }) {

    const { date, user, body } = message

    let date2 = date
    date2 = moment(date2).utc().format('DD-MM-YY HH:mm')

    return <ul>
        <li>{date2}</li>
        <li>{user.name}</li>
        <li>{body}</li>
    </ul>
})