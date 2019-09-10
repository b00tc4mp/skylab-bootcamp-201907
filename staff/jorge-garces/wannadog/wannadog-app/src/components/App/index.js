import React from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'
import Landing from '../Landing'
import Sign from '../Sign'
import Register from '../Register'
import logic from '../../logic'


function App() {

  async function handleLogin(email, password) {
    try {
      await logic.authenticateUser(email, password)

      console.log('ok, authenticated... TODO show succeed login panel')
    } catch ({ message }) {
      console.log('fail authenticate', message)
    }
  }

  async function handleRegister(name, surname, email, password) {
    try {
      await logic.registerUser(name, surname, email, password)

      console.log('ok, registered... TODO show succeed register panel')
    } catch ({ message }) {
      console.log('fail register', message)
    }
  }

  return (
    <Switch>
      <Route exact path="/" render={() => <Landing />} />
      <Route path="/sign" render={() => <Sign onLogin={handleLogin} />} />
      <Route path="/register" render={() => <Register onRegister={handleRegister} />} />
    </Switch>
  );
}

export default withRouter(App);