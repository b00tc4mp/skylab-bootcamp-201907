import React from 'react'
import logic from '../../logic/'
import { withRouter, Route } from 'react-router-dom'


 function Header({history}) {

    function handleLogout() {
        logic.logUserOut()
        history.push('/')
    }

    return <>
      <header className="header hidden">
          <div className="header__left">
              <img src={require('../../img/logo.svg')} alt="e-cohabitat project logo" className="header__logo"/>
              <nav>
                  <ul className="header__main-menu">
                      <li className="header__item"><a className="header__main-link" href={`/`} title="home">Home</a></li>
                      <li className="header__item"><a className="header__main-link" href="#" title="about">About</a></li>
                  </ul>
              </nav>
          </div>
              
          {logic.isUserLoggedIn() ?  
            <nav className="header__right">
                <ul className="header__secondary-menu">
                    <li className="header__item"><a className="header__secondary-link" title="user area">User area</a></li>
                    <li className="header__item"><button className="header__logout-button" title="sign out" onClick={handleLogout}>Sign out</button></li>
                </ul>
            </nav>
            :
            <nav className="header__right">
                <ul className="header__secondary-menu">
                    <li className="header__item"><a className="header__secondary-link" href={`/#/sign-up`} title="sign up">Sign up</a></li>
                    <li className="header__item"><a className="header__secondary-link" href={`/#/sign-in`} title="sign in">Sign in</a></li>
                </ul>
            </nav>
          }
              
      </header>
    </>
}

export default withRouter(Header)