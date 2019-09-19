import React, { useState, useEffect } from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'
import { Landing, Sign, Register, Success, DogSuccess, Confirm, Search, Profile, RegisterDog, Favorites, DogDetail, MyDogs, About, ChatLounge, Chat, Alerts, Feedback } from '../../components'
import logic from '../../logic'
import SearchResults from '../SearchResults'

function App({ history }) {

  const [dogs, setDogs] = useState([])
  const [error, setError] = useState(undefined)

  useEffect(() => {
    setError()
  }, [history.location])

  async function handleRegister(name, surname, email, password) {
    try {
      await logic.registerUser(name, surname, email, password)
      history.push('/success')

    } catch ({ message }) {
      setError(message)
    }
  }

  async function handleLogin(email, password) {
    try {
      await logic.authenticateUser(email, password)

      history.push('/profile')
    } catch ({ message }) {
      setError(message)
    }
  }

  const handleLogout = () => {
    logic.logUserOut()
    history.push('/')
  }

  const searchCallback = dogs => {
    setDogs(dogs)
    history.push('/searchResults')
  }

  async function handleSearch(distance, breed, gender, size, age, neutered, withDogs, withCats, withChildren) {
    try {
      await logic.search(distance, breed, gender, size, age, neutered, withDogs, withCats, withChildren, searchCallback)
    } catch ({ message }) {
      console.log('something went wrong with search', message)
    }

  }

  const registerCallback = async (doge, image) => {
    try {
      await logic.upload(doge, image)
      history.push('/dogsuccess')
    } catch ({ message }) {
      console.log('something went wrong with registry', message)
    }

  }

  async function handleRegisterDog(name, breed, gender, size, age, notes, neutered, withDogs, withCats, withChildren, chip, image) {
    try {
      await logic.registerDog(name, breed, gender, size, age, notes, neutered, withDogs, withCats, withChildren, chip, registerCallback, image)
    } catch ({ message }) {
      console.log('something went wrong with registry', message)
    }
  }

  return (
    <Switch>
      <Route exact path="/" render={() => <Landing />} />
      <Route path="/sign" render={() => <Sign onLogin={handleLogin} error={error} />} />
      <Route path="/register" render={() => <Register onRegister={handleRegister} error={error} />} />
      <Route path="/success" render={() => <Success />} />
      <Route path="/dogsuccess" render={() => <DogSuccess />} />
      <Route path="/confirm" render={() => <Confirm />} />
      <Route path="/search" render={() => <Search onSearch={handleSearch} />} />
      <Route path="/searchResults" render={() => <SearchResults dogs={dogs} />} />
      <Route path="/profile" render={() => logic.isUserLoggedIn() ? <Profile onLogout={handleLogout} /> : history.push('/sign')} />
      <Route path="/dog/:id" render={() => <DogDetail />} />
      <Route path="/favorites" render={() => logic.isUserLoggedIn() ? <Favorites /> : history.push('/sign')} />
      <Route path="/mydogs" render={() => logic.isUserLoggedIn() ? <MyDogs /> : history.push('/sign')} />
      <Route path="/about" render={() => logic.isUserLoggedIn() ? <About /> : history.push('/sign')} />
      <Route path="/add" render={() => logic.isUserLoggedIn() ? <RegisterDog onRegisterDog={handleRegisterDog} /> : history.push('/sign')} />
      <Route path="/chats" render={() => logic.isUserLoggedIn() ? <ChatLounge /> : {}} />
      <Route path="/chat/:id" render={props => logic.isUserLoggedIn() ? <Chat chatId={props.match.params.id} /> : {}} />
      <Route exact path="/alerts" render={() => <Alerts />} />
    </Switch>
  )
}

export default withRouter(App)