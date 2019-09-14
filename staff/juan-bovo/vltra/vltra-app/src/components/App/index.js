import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Link, Route, withRouter } from 'react-router-dom'
import logic from '../../logic'
import Context from '../ProviderContext'

import Home from '../Home'
import Header from '../Header'
import Footer from '../Footer'
import Main from '../Main'
import Register from '../Register'
import Login from '../Login'
import RegisterSuccess from '../Register-success'

import './style.sass'


function App({history}) {
  const [view, setView] = useState(logic.isUserLoggedIn() ? 'home' : undefined)

  const [user, setUser] = useState(undefined)

  useEffect(() => {
    if (history.location.pathname === '/') setView(undefined)
  }, [history.location])
  
  return <>
    {/* <Context.Provider value={{ credentials, setCredentials, view, setView, user, setUser }}>
      <Router> */}
        <Route component={Header} />
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/register-success" component={RegisterSuccess} />
        <Footer />
      {/* </Router>
    </Context.Provider> */}
  </>
}

export default withRouter(App)
