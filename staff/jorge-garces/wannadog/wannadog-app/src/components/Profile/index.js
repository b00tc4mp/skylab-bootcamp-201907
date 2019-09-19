import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'

export default withRouter(function ({ history, onLogout }) {

    const [user, setUser] = useState()

    useEffect(() => {
        (async () => {
            const user = await logic.retrieveUser()
            sessionStorage.name = user.name
            setUser(user)
        })()
    }, [history.location])

    return <>
        <section className="body-profile">
            <Link className="back" to="/search"><i className="fas fa-arrow-left"></i></Link>
            {user && <h2 className="container__title">{user.name}</h2>}
            <section className="body-profile__nav">
                <Link className="body-profile__link" to="/mydogs">My dogs</Link>
                <Link className="body-profile__link" to="/favorites">Favorites</Link>
                <Link className="body-profile__link" to="/alerts">Alerts</Link>
                <Link className="body-profile__link" to="/chats">Messages</Link>
            </section>
            <div className="about">
                <Link className="body-profile__link" to="/about">About WannaDOG</Link>
            </div>
            <button class="logout button" onClick={onLogout}>Logout</button>
        </section>
    </>
})