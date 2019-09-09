import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from './Landing/index-old'
import Register from './Register'
import Login from './Login'
import CreateLeague from './LeagueLanding'
import RegisterSuccess from './Register-success'


function AppRouter() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login/">Login</Link>
            </li>
            <li>
              <Link to="/register/">Register</Link>
            </li>
            <li>
              <Link to="/leagues/">Leagues</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={App} />
        <Route path="/login/" component={Login} />
        <Route path="/register/" component={Register} />
        <Route path="/leagues/" component={CreateLeague} />
        <Route path="/register-success/" component={RegisterSuccess} />
      </div>
    </Router>
  )
}

export default AppRouter