import React, { useState, useEffect } from 'react'
// import './index.sass'
import { Favorites, Header, Home, Landing, Login, Details, Profile, Register } from '../index.js'
import logic from '../../logic'
import { Route, withRouter } from 'react-router-dom'

function App({ history }) {

  const [user, setUser] = useState()

  const [view, setView] = useState(history.location.pathname === '/' ? 'landing' : history.location.pathname.slice(1))

  useEffect(() => {
    if (history.location.pathname === '/') setView('landing')
  }, [history.location])

  const handleRegister = async (username, password, email) => {
    try {
      await logic.registerUser(username, password, email)

      history.push('/login')
    } catch ({ message }) {
      console.log('fail register', message)
    }
  }

  const handleLogin = async (email, password) => {
    try {
      await logic.authenticateUser(email, password)
      history.push('/')
      setView('home')

    } catch ({ message }) {
      console.log('fail login', message)
    }
  }

  return (<>

    <div className="App">
      <Header view={view} setView={setView} user={user} />
      <Route exact path='/' render={() => logic.isUserLoggedIn() ? <Home setUser={setUser} /> : <Landing />} />
      <Route path="/register" render={() => <Register onRegister={handleRegister} />} />
      <Route path="/login" render={() => <Login onLogin={handleLogin} />} />
      <Route path="/profile" render={() => logic.isUserLoggedIn() ? <Profile setView={setView} user={user} /> : <Landing />} />
      <Route path='/details/:id' component={Details}  />
    </div>
  </>)
}

export default withRouter(App)
