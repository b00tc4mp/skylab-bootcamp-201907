import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from './App'
import Register from './Register'
import Login from './Login'


function AppRouter() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">App</Link>
            </li>
            <li>
              <Link to="/login/">Login</Link>
            </li>
            <li>
              <Link to="/register/">Register</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={App} />
        <Route path="/login/" component={Login} />
        <Route path="/register/" component={Register} />
      </div>
    </Router>
  )
}

export default AppRouter