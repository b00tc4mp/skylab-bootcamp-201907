import Context from '../context';
import React, { useState } from 'react'
import logic from '../../logic'
import moment from "moment"

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


function App({ history }) {

  const { id, token } = logic.__userCredentials__
  const [credentials, setCredentials] = useState({ id, token })
  const [spaceId, setSpaceId] = useState()
  const [mySpace, setMySpace] = useState()
  const [ currentDate, setCurrentDate ] = useState(moment())

  
  return (
    <>

      <Context.Provider value = {{ credentials, setCredentials, spaceId, setSpaceId, mySpace, setMySpace, currentDate, setCurrentDate }} >

      <Header/>
      
        <Route exact path="/" render={() => logic.isUserLoggedIn() ? history.push('/home') : <Landing/>} />
        <Route path="/sign-up" render={() => logic.isUserLoggedIn() ? history.push('/home') : <Register />} />
        <Route path="/sign-up-success" render={() => logic.isUserLoggedIn() ? history.push('/home') : <RegisterSuccess />} />
        <Route path="/sign-in" render={() => logic.isUserLoggedIn() ? history.push('/home') : <Login />} />
        <Route path="/home" render={() => logic.isUserLoggedIn() ? <Home /> :  history.push('/')} />
        <Route path="/spaces/:spaceId" render={() => !logic.isUserLoggedIn() ? history.push('/') : <Space/>} />
        <Route path="/space-register" render={() => !logic.isUserLoggedIn() ? history.push('/') : <SpaceRegister />} />
        <Route path="/month" render={() => !logic.isUserLoggedIn() ? history.push('/') : <Month />} />
        <Route path="/week" render={() => !logic.isUserLoggedIn() ? history.push('/') : <Week />} />
        <Route path="/day" render={() => !logic.isUserLoggedIn() ? history.push('/') : <Day />} />

      <Footer/>

      </Context.Provider>
    </>
  )
}

export default withRouter(App)