import React, { useState, useEffect} from 'react'
import { Landing, Register, Login, Home, UserProfile, CreateMenu, CurrentWeek, RecipeDetail } from '../../components'
import logic from '../../logic'
import { Route, withRouter } from 'react-router-dom'


export default withRouter(function ({ history }) {
  const [view, setView] = useState(logic.isUserLoggedIn() ? 'home' : undefined)  
  const [error, setError] = useState()

  useEffect(() => {
    setError()
  }, [history.location])

  const handleRegister = async (name, surname, email, password) => {
    try{
      await logic.registerUser(name, surname, email, password)

      history.push('/login')
    } catch ({ message }) {
      setError(message)
    }
  }

  const handleLogin = async (email, password) => {
    try{
      await logic.authenticateUser(email, password)

      setView('home')
      history.push('/home')
    } catch ({ message }) {
      setError(message)
    }
  }

  const handleRegisterDay = async (day, breakfast, lunch, snack, dinner) => {
    try{
      await logic.registerDay(day, breakfast, lunch, snack, dinner)

      history.push('/create-menu')
    } catch({ message }) {
      setError(message)
    }
  }

  const handleRetrieveRecipe = async (id) => {
    try{
      await logic.retrieveRecipe(id)

      history.push('/current-week')
    } catch( { message } ) {
    }
  }

  const handleLogout = () => {
    logic.logUserOut()

    setView(undefined)
    history.push('/')
  }

  return <>
    <Route exact path="/" render={() => <Landing />} />
    <Route path="/login" render={() => <Login onLogin={handleLogin} error={error}/>} />
    <Route path="/register" render={() => <Register onRegister={handleRegister} error={error}/>} />
    <Route path="/home" render={() => logic.isUserLoggedIn() ? <Home onLogout={handleLogout} /> : history.push('/login') } />
    <Route path="/current-week" render={() => logic.isUserLoggedIn() ? <CurrentWeek onLogout={handleLogout} onRetrieveRecipe={handleRetrieveRecipe} /> : history.push('/login')} />
    <Route path="/create-menu" render={() => logic.isUserLoggedIn() ? <CreateMenu onLogout={handleLogout} onRegisterDay={handleRegisterDay} error={error}/> : history.push('/login')} />
    <Route path="/user-profile" render={() => logic.isUserLoggedIn() ? <UserProfile onLogout={handleLogout} /> : history.push('/login')} />
    <Route path="/recipe-detail/:recipeId" render={() => logic.isUserLoggedIn() ? <RecipeDetail onLogout={handleLogout} /> : history.push('/login')} />
  </>
})



