import Context from '../context';
import React, { useState, useEffect } from 'react'
import logic from '../../logic'

import Header from '../Header'
import Landing from '../Landing'
import Register from '../Register'
import RegisterSuccess from '../Register-success'
import Login from '../Login'
import Home from '../Home'
import Space from '../Space'
import SpaceRegister from '../Space-register'
import Month from '../Month'
import Week from '../Week'
import Day from '../Day'
import Footer from '../Footer'

import { withRouter, Route } from 'react-router-dom'

const { id, token } = sessionStorage

function App({ history }) {

  const [view, setView] = useState('')
  const [credentials, setCredentials] = useState({ id, token })

  return (
    <>

    <Context.Provider value = {{ view, setView, credentials, setCredentials }} >

      <Header/>

      <Route exact path="/" render={() => logic.isUserLogged() ? history.push('/home') : <Landing/>} />
      <Route path="/sign-up" render={() => logic.isUserLogged() ? history.push('/home') : <Register />} />
      <Route path="/sign-up-success" render={() => logic.isUserLogged() ? history.push('/home') : <RegisterSuccess />} />
      <Route path="/sign-in" render={() => logic.isUserLogged() ? history.push('/home') : <Login />} />
      <Route path="/home" render={() => logic.isUserLogged() ? <Home /> :  history.push('/')} />
      <Route path="/space" render={() => !logic.isUserLogged() ? history.push('/') : <Space />} />
      <Route path="/space-register" render={() => !logic.isUserLogged() ? history.push('/') : <SpaceRegister />} />
      <Route path="/month" render={() => !logic.isUserLogged() ? history.push('/') : <Month />} />
      <Route path="/week" render={() => !logic.isUserLogged() ? history.push('/') : <Week />} />
      <Route path="/day" render={() => !logic.isUserLogged() ? history.push('/') : <Day />} />

      <Footer/>

      </Context.Provider>
    </>
  )
}

export default withRouter(App)