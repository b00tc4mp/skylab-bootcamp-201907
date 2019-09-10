import React, { useState } from 'react'
import Context from './Context'
import Landing from './Landing'
import Home from './Home'
import LeagueLanding from './LeagueLanding'
import RegisterSuccess from './Register-success'
import CreateTeam from './TeamCreate'
import MyTeam from './MyTeam'
import logic from '../logic'

import { withRouter, Route } from 'react-router-dom'

const { token } = sessionStorage

function App({ history }) {
  const [name, setName] = useState(null)
  const [code, setCode] = useState(null)
  const [player, setPlayer] = useState(null)
  const [teamName, setTeamName] = useState(null)
  const [teamId, setTeamId] = useState(null)
      

  return (
      <div className="App">
        <Context.Provider value={{name, setName, code, setCode, player, setPlayer, teamName, setTeamName, teamId, setTeamId }} >

          <Route exact path="/" render={() => logic.isUserLogged() ? history.push('/home') : <Landing /> } />

          <Route path="/home" render={() => logic.isUserLogged() ? <Landing /> :  history.push('/')  } />

          <Route path="/register-success"  component = {RegisterSuccess} />

          <Route path="/leagues" render={() => logic.isUserLogged() ? <LeagueLanding /> :  history.push('/')  } />
          
          <Route path="/teams" render={() => logic.isUserLogged() ? <CreateTeam /> :  history.push('/')  } />
          
          <Route path="/myteam" render={() => logic.isUserLogged() ? <MyTeam /> :  history.push('/')  } /> 
          
        </Context.Provider>
        </div>
    )
}
export default withRouter(App)