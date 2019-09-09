import React, { useState } from 'react'
import Context from './Context'
import Landing from './Landing'
import Home from './Home'
import LeagueLanding from './LeagueLanding'
import RegisterSuccess from './Register-success'
import CreateTeam from './TeamCreate'

import { withRouter, Route } from 'react-router-dom'
import logic from '../logic'

const { token } = sessionStorage

function App({ history }) {
  const [view, setView] = useState('')
  const [credentials, setCredentials] = useState({ token })
  const [user, setUser] = useState(undefined)
  

  return (
      <div className="App">
        <Context.Provider value={{ view, setView, credentials, setCredentials, user, setUser }} >

          <Route exact path="/" render={() => logic.isUserLogged() ? history.push('/home') : <Landing /> } />

          <Route path="/home" render={() => logic.isUserLogged() ? <Landing /> :  history.push('/')  } />

          <Route path="/register-success"  component = {RegisterSuccess} />

          <Route path="/leagues" render={() => logic.isUserLogged() ? <LeagueLanding /> :  history.push('/')  } />
          
          <Route path="/teams" render={() => logic.isUserLogged() ? <CreateTeam /> :  history.push('/')  } />
          
          {/* <Route path="/myteam" render={() => logic.isUserLogged() ? <MyTeam /> :  history.push('/')  } /> */}
          
        </Context.Provider>
        </div>
    )
}
export default withRouter(App)