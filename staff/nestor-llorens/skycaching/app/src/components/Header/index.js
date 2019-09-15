import React from 'react'
import logic from '../../logic'

import { withRouter } from 'react-router-dom'

function Header ({ view, setView, history, user }) {

    const handleGoToProfile = event => {
        event.preventDefault()
        history.push('/profile')
        setView('profile')
    }
    
    const handleGoToFavorites = event => {
        event.preventDefault()

        setView('favorites')

        history.push('/favorites')
    }
    
    const handleGoToFinds = event => {
        event.preventDefault()

        setView('finds')

        history.push('/finds')
    }

    const handleGoToHides = event => {
        event.preventDefault()

        setView('hides')

        history.push('/hides')
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
                {view !== 'profile' && <li><button onClick={handleGoToProfile}>Profile</button></li>}
                {view !== 'favorites' && <li><button onClick={handleGoToFavorites}>Favorites</button></li>}
                {view !== 'finds' && <li><button onClick={handleGoToFinds}>Finds</button></li>}
                {view !== 'hides' && <li><button onClick={handleGoToHides}>Hides</button></li>}  
                </ul>}
            </nav>
        </header> 
    )
}

export default withRouter(Header)