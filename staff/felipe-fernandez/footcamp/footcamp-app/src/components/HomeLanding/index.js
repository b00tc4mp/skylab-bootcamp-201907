import React from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import logic from "../../logic"
import MyTeam from "../MyTeam"
import Lineup from "../Lineup"
import MyLeagues from "../MyLeagues"
import LeagueTable from "../LeagueTable"


function AppRouter(props) {
    const { history } = props
  return (
    <Router>
      <div>
        <nav>
          <ul>
            
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
        <Route path="/mylineup" exact component={Lineup} />
        <Route path="/myteam/" component={MyTeam} /> 
        <Route path="/leaguetable/" component={LeagueTable} /> 

        
      </div>
    </Router>
  )
}

export default AppRouter