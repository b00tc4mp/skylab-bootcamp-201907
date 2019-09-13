import React from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

import './style.sass'

function Header() {
    return <>
    <header className="header">
        <a href="" className="header__logo">
            <Link to="/"><img className="header__logo--image" src="./img/logo.jpg" alt="VLTRA" /></Link>
        </a>

        <nav>
            <ul className="user-menu">
                <li className="user-menu__auth-option" ><Link to="/register" className="user-menu__auth-option-link" href="">Registro</Link></li>
                <li className="user-menu__auth-option" ><Link to="/login" className="user-menu__auth-option-link" href="">Inicia sesión</Link></li>
            </ul>
        </nav>
    </header>
    </>
}

export default Header