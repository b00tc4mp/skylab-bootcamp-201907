import React, {  useContext } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import MyTeam from "../MyTeam"
import MyLineup from "../MyLineup"
import MyLeagues from "../MyLeagues"
import LeagueTable from "../LeagueTable"
import Context from '../Context'
// import logic from '../../logic'


function AppRouter(props) {
  const { history } = props
  const { user } = useContext(Context)
 


  return (
    <Router>
      <div>
        <nav>
          <ul>
            Hola, {user && user.name}!
            <li>
              <Link to="/">My Leagues</Link>
            </li>
            <li>
              <Link to="/mylineup/">My line up</Link>
            </li>
            <li>
              <Link to="/myteam/">My Team</Link>
            </li>
            <li>
              <Link to="/leaguetable/">League table</Link>
            </li>
           
            
         
          </ul>
        </nav>
        
        <Route path="/" exact component={MyLeagues} />
        <Route path="/mylineup" exact component={MyLineup} />
        <Route path="/myteam/" component={MyTeam} /> 
        <Route path="/leaguetable/" component={LeagueTable} /> 

        
      </div>
    </Router>
  )
}

export default AppRouter