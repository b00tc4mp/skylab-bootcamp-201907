import React, { useState, useEffect } from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'
import { Landing, Sign, Register, Success, Confirm, Search, Profile, RegisterDog } from '../../components'
import logic from '../../logic'

function App({ history }) {

  const [dogs, setDogs] = useState([])
  const [view, setView] = useState(logic.isUserLoggedIn() ? 'home' : undefined)

  async function handleRegister(name, surname, email, password) {
    try {
      await logic.registerUser(name, surname, email, password)
      history.push('/success')

    } catch ({ message }) {
      console.log('fail register', message)
    }
  }

  async function handleLogin(email, password) {
    try {
      await logic.authenticateUser(email, password)

      setView('profile')
      history.push('/profile')
    } catch ({ message }) {
      console.log('fail authenticate', message)
    }
  }

  const handleLogout = () => {
    logic.logUserOut()
    setView(undefined)
    history.push('/')
  }

  useEffect(() => {
    if (history.location.pathname === '/') setView(undefined)
  }, [history.location])


  const callback = dogs => {
    console.log(dogs)
    setDogs(dogs)
  }


  async function handleSearch(distance, breed, gender, size, age, neutered, withDogs, withCats, withChildren) {
    try {
      await logic.search(distance, breed, gender, size, age, neutered, withDogs, withCats, withChildren, callback)
    } catch ({ message }) {
      console.log('something went wrong with search', message)
    }

  }

  async function handleRegisterDog(name, breed, gender, size, age, notes, neutered, withDogs, withCats, withChildren, chip) {

    try {
      const response = await logic.registerDog(name, breed, gender, size, age, notes, neutered, withDogs, withCats, withChildren, chip, setDogs)
      console.log(response)
    } catch ({ message }) {
      console.log('something went wrong with registry', message)
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
      {logic.isUserLoggedIn() && <Route path="/profile" render={() => <Profile onLogout={handleLogout} />} />}
      {logic.isUserLoggedIn() && <Route path="/add" render={() => <RegisterDog onRegisterDog={handleRegisterDog} />} />}
      {/* <Route path="/favorites" render={() => <Favorites  />} />
      <Route path="/messages" render={() => <Messages />} />
      TODO ----->    dogs.length && <Results dogs={dogs}>
      <Route path="/about" render={() => <About />} /> */}
    </Switch>
  );
}

export default withRouter(App);