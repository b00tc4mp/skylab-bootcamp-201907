import React, { useState } from 'react'
import { withRouter , Route } from 'react-router-dom'
// import React, { useEffect } from 'react'
import MyContext from '../Provider-Context'
import logic from '../../logic'

import Landing from '../Landing'
import Register from '../Register'
import Login from '../Login'
import Home from '../Home'
import User from '../User'
import Header from '../Header'
import ChatLounge from '../ChatLounge'
import Chat from '../Chat'

import './index.sass'

function App({history}) {
  const [view, setView] = useState(history.location.pathname === '/' ? 'landing' : history.location.pathname.slice(1))
  const [user, setUser] = useState("")
  const [addPet, setAddPet] = useState(false)
  const [userId, setUserId] = useState()

  return  <MyContext.Provider value = { { view, setView, user, setUser, addPet, setAddPet, setUserId, userId } }>  
            { logic.isUserLoggedIn() && <Header/> }
                <Route exact path = "/" render = { () => !logic.isUserLoggedIn() ? <Landing/> : <Home/>} />
                <Route path = "/register" render = { () => <Register/> } />
                <Route path = "/login" render = { () => <Login/> } />
                <Route path = "/home" render = { () => !logic.isUserLoggedIn() ? <Landing/> : <Home /> } />
                <Route path = "/user" render = { () => !logic.isUserLoggedIn() ? <Login/> : <User/> } /> 
                <Route path = "/chats" render = {() => !logic.isUserLoggedIn() ?  <Login/> : <ChatLounge/>} />
                <Route path = "/chat/:id" render = {props => !logic.isUserLoggedIn() ? <Login/> : <Chat chatId = {props.match.params.id}/> }/>
          </MyContext.Provider>
}

export default withRouter(App)

