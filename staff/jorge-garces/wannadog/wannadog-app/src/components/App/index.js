import React from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'
import { Landing, Sign, Register, Success, Confirm, Search } from '../../components'
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

  // async function handleSearch(breed, gender, size, years, months, neutered, withDogs, withCats, withChildren, distance) {
  //   try {
  //     await logic.search(breed, gender, size, years, months, neutered, withDogs, withCats, withChildren, distance)
  //   } catch ({ message }) {
  //     console.log('something went wrong with search', message)
  //   }
  // }

  async function handleSearch(distance, breed, gender, size, age, neutered, withDogs, withCats, withChildren) {
    try {
      console.log(distance, breed, gender, size, age, neutered, withDogs, withCats, withChildren)
    } catch ({ message }) {
      console.log('something went wrong with search', message)
    }
  }

  return (
    <Switch>
      <Route exact path="/" render={() => <Landing />} />
      <Route path="/sign" render={() => <Sign onLogin={handleLogin} />} />
      <Route path="/register" render={() => <Register onRegister={handleRegister} />} />
      <Route path="/success" render={() => <Success />} />
      <Route path="/confirm" render={() => <Confirm />} />
      <Route path="/search" render={() => <Search onSearch={handleSearch} />} />
    </Switch>
  );
}

export default withRouter(App);