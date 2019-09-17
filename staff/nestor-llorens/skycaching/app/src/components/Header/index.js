import React from 'react'
import logic from '../../logic'

import { withRouter } from 'react-router-dom'

function Header({ view, setView, history, user }) {

    const handleGoToProfile = event => {
        event.preventDefault()
        history.push('/profile')
        setView('profile')
    }

    const handleOnLogout = () => {
        logic.logUserOut()

        setView('landing')
        history.push('/')
    }

    const handleGoToRegister = event => {
        event.preventDefault()

        history.push('/register')
        setView('register')

    }

    const handleGoToLogin = event => {
        event.preventDefault()

        history.push('/login')
        setView('login')
    }

    const handleGoToHome = event => {
        event.preventDefault()

        history.push('/')
        setView('home')
    }



    return (
        <header className='Header'>
            <nav>
                {!logic.isUserLoggedIn() ?
                    <ul>
                        {view !== 'register' && <li><button onClick={handleGoToRegister}>Register</button></li>}
                        {view !== 'login' && <li><button onClick={handleGoToLogin}>Login</button></li>}
                    </ul>
                    :
                    <ul>
                        <li>Hello, {user && user.username}!
                <button onClick={handleOnLogout}>Logout</button></li>
                        <li><button onClick={handleGoToProfile}>Profile</button></li>
                        <li><button onClick={handleGoToHome}>Home</button></li>

                    </ul>}
            </nav>
        </header>
    )
}

export default withRouter(Header)