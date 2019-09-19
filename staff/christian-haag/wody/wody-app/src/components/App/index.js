import React, { useState, useEffect } from 'react'
import './index.sass'
import logic from '../../logic'
import { Route, withRouter } from 'react-router-dom'
import Register from '../RegisterPanel'
import Registersuccess from '../RegistersuccessPanel'
import Login from '../LoginPanel'
import Home from '../Home'
import Gender from '../GenderPanel'
import Goal from '../GoalPanel'
import Fitnesslvl from '../FitnesslvlPanel'
import Userdata from '../UserdataPanel'
import Settings from '../Settings'
import Favorites from '../Favorites'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faTwitter, faFacebookSquare } from '@fortawesome/free-brands-svg-icons'


export default withRouter(function ({ history }) {
  const [view, setView] = useState(logic.isUserLoggedIn() ? 'home' : undefined)

  const handleBack = () => {
    setView('landing')
    history.push('/')
  }

  const handleGoToRegister = event => {
    event.preventDefault()
    setView('register')
    history.push('/register')
  }

  const handleGoToLogin = event => {
    event.preventDefault()
    setView('login')
    history.push('/login')
  }

  useEffect(() => {
    if (history.location.pathname === '/') setView('landing')
  }, [history.location])

  const handleLogout = () => {
    logic.logUserOut()
    setView('landing')
    history.push('/')
  }

  return <div className="App">
    {view === 'landing' &&
      <>
        <header>
          <section className="header-bgrnd">
            <div className="header-bgrnd__container">
              <div className="header-bgrnd__container--logo"></div>
              <div className="header-bgrnd__container--logo-text">wody</div>
              <div className="header-bgrnd__container--text">
                <h2>Become a better you, today.</h2>
              </div>
            </div>
          </section>
        </header>

        <div className="main-container">

          <div className="main-container--uppersection">
            <p className="big-p">START TODAY</p>
            <p className="p-upper">Random workouts adapted to your fitness level and goals.</p>
          </div>

          <div className="main-container--lowersection">
            <p>&#x25B2; You decide your intensity</p>
            <p>&#x25B2; Completely randomized workouts</p>
            <p>&#x25B2; Feel the results</p>
          </div>
        </div>


        <nav className="navigation-container">
          <ul className="main-container__ul">
            <li className="main-container--register"><a className="register-bttn" href="#" onClick={handleGoToRegister}>Sign up</a></li>
            <div className="or-span">or</div>
            <li className="main-container--login"><a className="login-bttn" href="#" onClick={handleGoToLogin}>Sign in</a></li>
          </ul>
        </nav>

        <section className="footer">
          <div className="footer ">
            <p className="footer app">wody- 2019 CMH</p>
            <a href="#" className="footer--text">Legal</a>
            <a href="#" className="footer--text">Contact</a>
          </div>
          <div className="footer container-icon">
            <FontAwesomeIcon className="insta" icon={faInstagram} />
            <FontAwesomeIcon className="insta" icon={faFacebookSquare} />
            <FontAwesomeIcon className="insta" icon={faTwitter} />
          </div>


        </section>
      </>}
    <Route path="/register" render={() => <Register onBack={handleBack} />} />
    <Route path="/registersuccess" render={() => <Registersuccess />} />
    <Route path="/login" render={() => <Login onBack={handleBack} />} />
    <Route path="/home" render={() => <Home onLogout={handleLogout} />} />
    {logic.isUserLoggedIn() && <Route path="/gender" render={() => <Gender onBack={handleBack} />} />}
    <Route path="/goal" render={() => <Goal onBack={handleBack} />} />
    <Route path="/fitnesslvl" render={() => <Fitnesslvl onBack={handleBack} />} />
    <Route path="/userdata" render={() => <Userdata />} />
    <Route path="/favorites" render={() => <Favorites />} />
    <Route path="/settings" render={() => <Settings />} />

  </div>
})
