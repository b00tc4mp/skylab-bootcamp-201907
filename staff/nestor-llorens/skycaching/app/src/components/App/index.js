import React, { useState, useEffect } from 'react'
import { Header, Home, Landing, Login, Details, Profile, Register, Footer } from '../index.js'
import logic from '../../logic'
import { Route, withRouter } from 'react-router-dom'
import './index.sass'

function App({ history }) {

  const [user, setUser] = useState()

  const [view, setView] = useState(history.location.pathname === '/' ? 'landing' : history.location.pathname.slice(1))

  useEffect(() => {
    if (history.location.pathname === '/') setView('landing')
  }, [history.location])

  return (<>

    <div className="App">
      <Header view={view} setView={setView} user={user} setUser={setUser} />
      <Route exact path='/' render={() => logic.isUserLoggedIn() ? <Home setUser={setUser}/> : <Landing setView={setView}/>} />
      <Route path="/register" render={() => <Register/>} />
      <Route path="/login" render={() => <Login setView={setView} />} />
      <Route path="/profile" render={() => logic.isUserLoggedIn() ? <Profile setView={setView} user={user} setUser={setUser} /> : <Landing />} />
      {/* <Route path='/details/:id' component={Details} /> */}
      <Route path='/details/:id' render={() => <Details/> }/>
      <Footer/>
    </div>
  </>)
}

export default withRouter(App)
