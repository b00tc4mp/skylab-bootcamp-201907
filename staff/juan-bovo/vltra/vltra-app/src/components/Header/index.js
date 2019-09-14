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

    return <>
        <header className="header">
            <Link to="/" className="header__logo"><img className="header__logo--image" src="./img/logo.jpg" alt="VLTRA" /></Link>

            <nav>
                {!logic.isUserLoggedIn() ?
                    <ul className="user-menu">
                        <li className="user-menu__auth-option" ><Link to="/register" className="user-menu__auth-option-link" href="">Registro</Link></li>
                        <li className="user-menu__auth-option" ><Link to="/login" className="user-menu__auth-option-link" href="">Inicia sesión</Link></li>
                    </ul> :
                    <ul className="user-menu">
                        <p className="user-menu__user-option">¡Hola, {user && user.nickname}!</p>
                        <li className="user-menu__auth-option" >
                            <a className="user-menu__auth-option-link" href="" onClick={event => {
                                event.preventDefault()
                                //--> Here comes a function!
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