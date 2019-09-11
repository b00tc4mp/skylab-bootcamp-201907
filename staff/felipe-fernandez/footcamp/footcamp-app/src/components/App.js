import React, { useState } from 'react'
import Context from './Context'
import Landing from './Landing'
import CreateLeagues from './CreateLeagues'
import RegisterSuccess from './Register-success'
import CreateTeam from './TeamCreate'
import MyLeagues from './MyLeagues'
import HomeLanding from './HomeLanding'
import logic from '../logic'

import { withRouter, Route } from 'react-router-dom'

const { token } = sessionStorage

function App({ history }) {
  const [name, setName] = useState(null)
  const [code, setCode] = useState(null)
  const [nameLeague, setNameLeague] = useState(null)
  const [leagueId, setLeagueId] = useState(null)
  const [player, setPlayer] = useState(null)
  const [teamName, setTeamName] = useState(null)
  const [teamId, setTeamId] = useState(null)
  const [team, setTeam] = useState(null)
  const [existLeague, setExistLeague] = useState()
      

  return (
      <div className="App">
        <Context.Provider value={{name, setName, code, setCode, nameLeague, setNameLeague, leagueId, setLeagueId,  player, setPlayer, teamName, setTeamName, teamId, setTeamId, team, setTeam, existLeague, setExistLeague }} >

          <Route exact path="/" render={() => logic.isUserLogged() ? history.push('/home') : <Landing /> } />

          <Route path="/home" render={() => logic.isUserLogged() ? <Landing /> :  history.push('/')  } />

          <Route path="/register-success"  component = {RegisterSuccess} />

          <Route path="/create-leagues" render={() => logic.isUserLogged() ? <CreateLeagues /> :  history.push('/')  } />
          
          <Route path="/create-teams" render={() => logic.isUserLogged() ? <CreateTeam /> :  history.push('/')  } />
          
          <Route path="/myleagues" render={() => logic.isUserLogged() ? <MyLeagues /> :  history.push('/')  } />

           <Route path="/home-landing" render={() => logic.isUserLogged() ? <HomeLanding /> :  history.push('/')  } />  



          {/* <Route path="/myteam" render={() => logic.isUserLogged() ? <Myteam /> :  history.push('/')  } />  */}
          
        </Context.Provider>
        </div>
    )
}
export default withRouter(App)