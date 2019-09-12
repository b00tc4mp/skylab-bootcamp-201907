import React from 'react'
import logic from '../../logic/'


export default function() {

    function handleLogout(){
        logic.logUserOut()
    }

    return <>
      <header class="header hidden">
          <div>
              <img src={require('../../img/logo.svg')} alt="e-cohabitat project logo" class="header__logo"/>
              <nav>
                  <ul class="header__main-menu">
                      <li class="header__item"><a class="header__main-link" href={`/`} title="home">Home</a></li>
                      <li class="header__item"><a class="header__main-link" href="" title="about">About</a></li>
                  </ul>
              </nav>
          </div>
              
          {logic.isUserLoggedIn() ?  
            <nav>
                <ul class="header__secondary-menu">
                    <li class="header__item"><a class="header__secondary-link" title="User area">User area</a></li>
                    <li class="header__item"><a class="header__secondary-link" href="" title="Sign out" onClick={handleLogout}>Sign out</a></li>
                </ul>
            </nav>
            :
            <nav>
                <ul class="header__secondary-menu">
                    <li class="header__item"><a class="header__secondary-link" href={`/#/sign-up`} title="Sign up">Sign up</a></li>
                    <li class="header__item"><a class="header__secondary-link" href={`/#/sign-in`} title="Sign in">Sign in</a></li>
                </ul>
            </nav>
          }
              
      </header>
    </>
}