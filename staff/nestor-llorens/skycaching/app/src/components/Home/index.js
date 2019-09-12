import React, { useState, useEffect } from 'react'
// import './index.sass'
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

    return <main className="home">
        Hola, {user && user.username}!
        <button onClick={onLogout}>Logout</button>
    </main>
})