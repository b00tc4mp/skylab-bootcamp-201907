import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'

export default withRouter(function ({ history, onLogout }) {

    const [user, setUser] = useState()

    useEffect(() => {
        (async () => {
            const user = await logic.retrieveUser()

            setUser(user)
        })()
    }, [history.location])

    return <>
        <h2>{user && user.name}</h2>
        <Link to="/mydogs">My Dogs</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/alerts">Alerts</Link>
        <Link to="/messages">Messages</Link>
        <Link to="/about">About WannaDOG</Link>
        <button onClick={onLogout}>Logout</button>
    </>
})