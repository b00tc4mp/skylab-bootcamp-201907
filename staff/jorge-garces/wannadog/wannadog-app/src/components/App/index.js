import React, { useState } from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'
import { Landing, Sign, Register, Success, Confirm, Search, Profile, RegisterDog, Favorites, DogDetail, MyDogs, About, ChatLounge, Chat } from '../../components'
import logic from '../../logic'
import SearchResults from '../SearchResults'

function App({ history }) {

  const [dogs, setDogs] = useState([])

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

      history.push('/profile')
    } catch ({ message }) {
      console.log('fail authenticate', message)
    }
  }

  const handleLogout = () => {
    logic.logUserOut()
    // setView(undefined)
    history.push('/')
  }

  const callback = dogs => {
    setDogs(dogs)
    history.push('/searchResults')
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
      <Route path="/searchResults" render={() => dogs.length > 0 && <SearchResults dogs={dogs} />} />
      <Route path="/profile" render={() => logic.isUserLoggedIn() ? <Profile onLogout={handleLogout} /> : history.push('/sign')} />
      <Route path="/dog/:id" render={() => <DogDetail />} />
      <Route path="/favorites" render={() => logic.isUserLoggedIn() ? <Favorites /> : history.push('/sign')} />
      <Route path="/mydogs" render={() => logic.isUserLoggedIn() ? <MyDogs /> : history.push('/sign')} />
      <Route path="/about" render={() => logic.isUserLoggedIn() ? <About /> : history.push('/sign')} />
      <Route path="/add" render={() => logic.isUserLoggedIn() ? <RegisterDog onRegisterDog={handleRegisterDog} /> : history.push('/sign')} />
      <Route path="/chats" render={() => logic.isUserLoggedIn() ? <ChatLounge /> : {}} />
      <Route path="/chat/:id" render={props => logic.isUserLoggedIn() ? <Chat chatId={props.match.params.id} /> : {}} />

      {/* <Route path="/favorites" render={() => <Favorites  />} />
      <Route path="/messages" render={() => <Messages />} />*/}
    </Switch>
  )
}

export default withRouter(App);