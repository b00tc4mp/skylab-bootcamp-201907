import React from 'react'
import logic from '../../logic/'
import { withRouter } from 'react-router-dom'


 function Header({history}) {

    function handleGoToHome(event) {
        event.preventDefault()

        history.push('/')
    }

    function handleGoToRegister(event) {
        event.preventDefault()

        history.push(`/sign-up`)
    }

    function handleGoToLogin(event) {
        event.preventDefault()

        history.push(`/sign-in`)
    }
    
    function handleLogout() {
        logic.logUserOut()
        history.push('/')
    }

    return <>

        {logic.isUserLoggedIn() &&
        <nav className="mobile-menu">
            <ul className="mobile-menu__list">
                <li className="mobile-menu__item">
                    <img src={require('../../img/logo.svg')} alt="e-cohabitat project logo" className="mobile-menu__logo" onClick={handleGoToHome}/>
                </li>
                <li className="mobile-menu__item">
                    <button className="mobile-menu__logout-button" title="sign out" onClick={handleLogout}>Sign out</button>
                </li>
            </ul>
        </nav>          
        }

        <header className="header hidden">
            <div className="header__left">
                <img src={require('../../img/logo.svg')} alt="e-cohabitat project logo" className="header__logo"/>
                <nav>
                    <ul className="header__main-menu">
                        <li className="header__item"><a className="header__main-link" href="#" title="home" onClick={handleGoToHome}>Home</a></li>
                        <li className="header__item"><a className="header__main-link" href="#" title="about">About</a></li>
                    </ul>
                </nav>
            </div>
                
            {logic.isUserLoggedIn() ? 
                <nav className="header__right">
                    <ul className="header__secondary-menu">
                        <li className="header__item"><a className="header__secondary-link" href="#" title="user area">User area</a></li>
                        <li className="header__item"><button className="header__logout-button" title="sign out" onClick={handleLogout}>Sign out</button></li>
                    </ul>
                </nav>        
                :
                <nav className="header__right">
                    <ul className="header__secondary-menu">
                        <li className="header__item"><a className="header__secondary-link" href="#" title="sign up" onClick={handleGoToRegister}>Sign up</a></li>
                        <li className="header__item"><a className="header__secondary-link" href="#" title="sign in" onClick={handleGoToLogin}>Sign in</a></li>
                    </ul>
                </nav>
            }
        </header>
    </>
}

export default withRouter(Header)