import React from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'
import { Landing, Sign, Register, Success, Confirm, Search, Profile, AddDog } from '../../components'
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

  async function handleSearch(distance, breed, gender, size, age, neutered, withDogs, withCats, withChildren) {
    try {
      const dogs = await logic.search(distance, breed, gender, size, age, neutered, withDogs, withCats, withChildren)
      console.log(dogs)
    } catch ({ message }) {
      console.log('something went wrong with search', message)
    }
  }

  async function handleAddDog() {
    // TODO
  }

  return (
    <Switch>
      <Route exact path="/" render={() => <Landing />} />
      <Route path="/sign" render={() => <Sign onLogin={handleLogin} />} />
      <Route path="/register" render={() => <Register onRegister={handleRegister} />} />
      <Route path="/success" render={() => <Success />} />
      <Route path="/confirm" render={() => <Confirm />} />
      <Route path="/search" render={() => <Search onSearch={handleSearch} />} />
      <Route path="/add" render={() => <AddDog onSearch={handleAddDog} />} />
      <Route path="/profile" render={() => <Profile />} />
      {/* <Route path="/favorites" render={() => <Favorites  />} />
      <Route path="/messages" render={() => <Messages />} />
      <Route path="/about" render={() => <About />} /> */}
    </Switch>
  );
}

export default withRouter(App);