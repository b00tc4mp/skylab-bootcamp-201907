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

// import './index.sass'

function App({history}) {
  const [view, setView] = useState(history.location.pathname === '/' ? 'landing' : history.location.pathname.slice(1))
  const [user, setUser] = useState("")
  const [addPet, setAddPet] = useState(false)

  return  <MyContext.Provider value = { { view, setView, user, setUser, addPet, setAddPet } }>  
            { logic.userLoggedIn() && <Header/> }
              <div className="App">
                <Route exact path = "/" render = { () => !logic.userLoggedIn() ? <Landing/> : <Home/>} />
                <Route path = "/register" render = { () => <Register/> } />
                <Route path = "/login" render = { () => <Login/> } />
                <Route path = "/home" render = { () => !logic.userLoggedIn() ? <Landing/> : <Home/> } />
                <Route path = "/user" render = { () => !logic.userLoggedIn() ? <Login/> : <User/> } /> 
              </div>
          </MyContext.Provider>
}

export default withRouter(App)

