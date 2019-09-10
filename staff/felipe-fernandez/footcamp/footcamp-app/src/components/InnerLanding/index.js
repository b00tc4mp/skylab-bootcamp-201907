import React from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import logic from "../../logic"
import MyTeam from "../MyTeam"
import Lineup from "../Lineup"
import HomeLanding from "../HomeLanding"


function AppRouter(props) {
    const { history } = props
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/myteam">My team</Link>
            </li>
            <li>
              <Link to="/mylineup/">My line up</Link>
            </li>
            <li>
              <Link to="/myleagues/">My leagues</Link>
            </li>
            <li>
              <Link to="/leaguetable/">League table</Link>
            </li>
          </ul>
        </nav>
        
        <Route path="/" exact component={HomeLanding} />
        <Route path="/myteam" exact component={MyTeam} />
        {/* <Route path="/myleagues" exact component={MyLeagues} /> */}
        <Route path="/mylineup/" component={Lineup} /> 
        {/* <Route path="/leaguetable/" component={LeagueTable} /> */}

        
      </div>
    </Router>
  )
}

export default AppRouter