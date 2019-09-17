import React, {useEffect,useContext, useState} from 'react'
import { HashRouter as Router, Link, Route, withRouter } from 'react-router-dom'
import logic from '../../logic'
import Context from '../ProviderContext'

import './style.sass'

function Header({ history }) {
    const [user, setUser] = useState()
    
    const handleLogout = () => {
        logic.logUserOut()

        // setView(undefined)
        history.push('/')
    }

    useEffect(() => {
        logic.isUserLoggedIn() ?
        (async () => {
            let user = await logic.retrieveUser()

            setUser(user)
        })() : setUser(undefined)
    }, [history.location])

    const handleGoToCreatePost = () => {
        history.push('/create-post')
    }

    const handleGoToUserProfile = () => {
        history.push('/my-profile')
    }

    return <>
        <header className="header">
            <Link to="/" className="header__logo"><img className="header__logo--image" src="./img/vltra-rectangle-orange.png" alt="VLTRA" /></Link>

            <nav>
                {!logic.isUserLoggedIn() ?
                    <ul className="user-menu">
                        <li className="user-menu__auth-option" ><p>¿Nuevo en Vltra?</p><Link to="/register" className="user-menu__auth-option-link" href="">¡Regístrate!</Link></li>
                        <li className="user-menu__auth-option" ><p>¿Ya eres usuario?</p><Link to="/login" className="user-menu__auth-option-link" href="">Inicia sesión</Link></li>
                    </ul> :
                    <ul className="user-menu">
                        <div className="user-menu__avatar-container">
                            <a onClick={event => {
                                event.preventDefault()
                                handleGoToUserProfile()}}>
                                <img className="user-menu__avatar-img" src={user && user.avatar}></img>
                                <p className="user-menu__user-option">{user && user.nickname}</p>
                            </a>
                        </div>
                        <li className="user-menu__auth-option" >
                            <a className="user-menu__auth-option-link" href="" onClick={event => {
                                event.preventDefault()
                                handleGoToCreatePost()
                                }}>¡Escribir post!</a></li>
                        <li className="user-menu__auth-option" >
                            <a className="user-menu__auth-option-link" href="" onClick={event => {
                                event.preventDefault()
                                handleLogout()
                            }}>Cerrar sesión</a></li>
                    </ul>}
            </nav>
        </header>
    </>
}

export default withRouter(Header)