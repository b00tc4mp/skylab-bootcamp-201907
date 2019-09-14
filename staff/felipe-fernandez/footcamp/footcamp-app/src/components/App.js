import React, { useState } from 'react'
import Context from './Context'
import Landing from './Landing'
import Login from './Login'
import Register from './Register'
import CreateLeagues from './CreateLeagues'
import RegisterSuccess from './Register-success'
import CreateTeam from './TeamCreate'
import MyLeagues from './MyLeagues'
import MyLineup from './MyLineup'
import LineupCreate from './LineupCreate'
import MyTeam from './MyTeam'
import LeagueTable from './LeagueTable'
import PlayerDetail from './PlayerDetail'
import TeamsLeague from './TeamsLeague'
import UserProfile from './UserProfile'
import LineupUpdate from './LineupUpdate'
import logic from '../logic'

import { withRouter, Route, Redirect } from 'react-router-dom'

const { token } = sessionStorage

function App(props) {

  const { history } = props
  const [user, setUser] = useState(null)
  const [name, setName] = useState(null)
  const [code, setCode] = useState(null)
  const [nameLeague, setNameLeague] = useState(null)
  const [leagueId, setLeagueId] = useState(null)
  const [player, setPlayer] = useState(null)
  const [teamName, setTeamName] = useState(null)
  const [teamId, setTeamId] = useState(null)
  const [teams, setTeams] = useState(null)
  const [lineup, setLineup] = useState(null)
  const [playerLineup, setPlayerLineup] = useState(null)
  const [existLeague, setExistLeague] = useState()
  const [error, setError] = useState()
   
      

  return (


      <div>

       
        <Context.Provider value={{name, setName, user, setUser, code, setCode, nameLeague, setNameLeague, leagueId, setLeagueId,  player, setPlayer, teamName, setTeamName, teamId, setTeamId, teams, setTeams, existLeague, setExistLeague, lineup, setLineup, setPlayerLineup, playerLineup ,error , setError}} >
 
          <Route exact path="/" render={() => logic.isUserLogIn() ? history.push('/myleague') : <Landing /> } />

          <Route path="/login" render={() => <Login /> } />
          
          <Route path="/register" render={() => <Register /> } /> 

          <Route path="/register-success"  component = {RegisterSuccess} />

          <Route path="/create-leagues" render={() => logic.isUserLogIn() ? <CreateLeagues /> :  history.push('/')  } />
          
          <Route path="/create-teams" render={() => logic.isUserLogIn() ? <CreateTeam /> :  history.push('/')  } />
          

          <Route path="/myleague"  render={() => logic.isUserLogIn() ? <MyLeagues /> :  history.push('/')  } />

          <Route path="/create-lineup"  render={() => logic.isUserLogIn() ? <LineupCreate  /> :  history.push('/')  } />

          <Route path="/mylineup"  render={() => logic.isUserLogIn() ? <MyLineup  /> :  history.push('/')  } />

          <Route path="/myteam"  render={() => logic.isUserLogIn()  ? <MyTeam />  :  history.push('/')  } />

          <Route path="/leaguetable"  render={() => logic.isUserLogIn() ? <LeagueTable />  : history.push('/')  } />

          <Route path="/player/:id"  render={() => logic.isUserLogIn() ? <PlayerDetail />  : history.push('/')  } />

          <Route path="/team/:id"  render={() => logic.isUserLogIn() ? <TeamsLeague />  : history.push('/')  } />
          
          <Route path="/lineup/:id"  render={() => logic.isUserLogIn() ? <LineupUpdate />  : history.push('/')  } />
          
          <Route path="/profile"  render={() => logic.isUserLogIn() ? <UserProfile />  : history.push('/')  } />




          
        </Context.Provider>
        </div>
    )
}
export default withRouter(App)