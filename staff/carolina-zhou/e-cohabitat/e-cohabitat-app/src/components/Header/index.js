import React from 'react'
import logic from '../../logic/'


export default function() {

    function handleLogout(){
        logic.logUserOut()
    }

    return <>
      <header className="header hidden">
          <div>
              <img src={require('../../img/logo.svg')} alt="e-cohabitat project logo" className="header__logo"/>
              <nav>
                  <ul className="header__main-menu">
                      <li className="header__item"><a className="header__main-link" href={`/`} title="home">Home</a></li>
                      <li className="header__item"><a className="header__main-link" href="" title="about">About</a></li>
                  </ul>
              </nav>
          </div>
              
          {logic.isUserLoggedIn() ?  
            <nav>
                <ul className="header__secondary-menu">
                    <li className="header__item"><a className="header__secondary-link" title="User area">User area</a></li>
                    <li className="header__item"><a className="header__secondary-link" href="" title="Sign out" onClick={handleLogout}>Sign out</a></li>
                </ul>
            </nav>
            :
            <nav>
                <ul className="header__secondary-menu">
                    <li className="header__item"><a className="header__secondary-link" href={`/#/sign-up`} title="Sign up">Sign up</a></li>
                    <li className="header__item"><a className="header__secondary-link" href={`/#/sign-in`} title="Sign in">Sign in</a></li>
                </ul>
            </nav>
          }
              
      </header>
    </>
}