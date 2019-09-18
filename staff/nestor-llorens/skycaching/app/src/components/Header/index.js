import React from 'react'
import logic from '../../logic'
import './index.sass'

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
        <header className='header'>
            <a onClick={handleGoToHome}><h1 className='header__title'>SkyCaching</h1></a>
            <nav className='header__navbar'>
                {!logic.isUserLoggedIn() ?
                    <ul className='header__navbar-ul'>
                        {view !== 'register' && <li className='header__item'><button className='header__button' onClick={handleGoToRegister}>Create account</button></li>}
                        {view !== 'login' && <li className='header__item'><button className='header__button' onClick={handleGoToLogin}>Sign in</button></li>}
                    </ul>
                    :
                    <ul className='header__list'>
                        <li className='header__item'><button className='header__button' onClick={handleGoToProfile}>Profile</button></li>
                        <li className='header__item-logout'><button className='header__button' onClick={handleOnLogout}>Logout</button>Hello, {user && user.username}!</li>
                    </ul>}
            </nav>
        </header>
    )
}

export default withRouter(Header)