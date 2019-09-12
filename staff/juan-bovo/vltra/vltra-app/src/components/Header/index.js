import React from 'react'

import './style.sass'


function Header() {
    return <header className="header">
        <a href="" className="header__logo">
            <img className="header__logo--image" src="./img/logo.jpg" alt="VLTRA" />
        </a>

        <ul className="user-menu">
            <li className="user-menu__auth-option" ><a className="user-menu__auth-option-link" href="">Register</a></li>
            <li className="user-menu__auth-option" ><a className="user-menu__auth-option-link" href="">Login</a></li>
        </ul>
    </header>
}

export default Header