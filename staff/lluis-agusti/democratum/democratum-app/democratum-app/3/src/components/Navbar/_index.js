import React, { useState, useEffect } from 'react'
import './index.sass'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'


export default withRouter(function ({ history }) {
    const [user, setUser] = useState()

    userId = user.id
    alert(userId)

    useEffect(() => {
        (async () => {
            const user = await logic.retrieveUser()

            setUser(user)
        })()
    }, [history.location])

    return <header> 
        <a href="" onClick={event => { event.preventDefault(); history.back() }} >Back</a>
        {user && user.fullname}!

    </header>

}











