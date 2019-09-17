import React, { useState, useEffect} from 'react'
//import '../../../src/index.css'
import { Landing, Register, Login, Home, UserProfile, CreateMenu, CurrentWeek, RecipeDetail } from '../../components'
import logic from '../../logic'
import { Route, withRouter } from 'react-router-dom'


export default withRouter(function ({ history }) {
  const [view, setView] = useState(logic.isUserLoggedIn() ? 'home' : undefined)
  

  // useEffect(() => {
  //   if (history.location.pathname === '/') setView(undefined)
  // }, [history.location])

  const handleRegister = async (name, surname, email, password) => {
    try{
      await logic.registerUser(name, surname, email, password)

      history.push('/login')
    } catch ({ message }) {
      console.log('fail register', message)
    }
  }

  const handleLogin = async (email, password) => {
    try{
      await logic.authenticateUser(email, password)

      setView('home')
      history.push('/home')
    } catch ({ message }) {
      console.log('fail login', message)
    }
  }

  const handleRegisterDay = async (day, breakfast, lunch, snack, dinner) => {
    try{
      await logic.registerDay(day, breakfast, lunch, snack, dinner)

      history.push('/create-menu')
    } catch({ message }) {
      console.log('fail register day', message)
    }
  }

  const handleRetrieveDay = async (id) => {
    try{
      await logic.retrieveDay(id)

      history.push('/current-week')
    } catch( { message } ) {
      console.log('fail retrieve day', message)
    }
  }

  const handleRetrieveRecipe = async (id) => {
    try{
      await logic.retrieveRecipe(id)

      history.push('/current-week')
    } catch( { message } ) {
      console.log('fail retrieve recipe', message)
    }
  }


  const handleLogout = () => {
    logic.logUserOut()

    setView(undefined)
    history.push('/')
  }

  return <>

    <Route exact path="/" render={() => <Landing />} />
    <Route path="/login" render={() => <Login onLogin={handleLogin} />} />
    <Route path="/register" render={() => <Register onRegister={handleRegister} />} />
    <Route path="/home" render={() => logic.isUserLoggedIn() ? <Home onLogOut={handleLogout} /> : history.push('/login') } />
    <Route path="/current-week" render={() => logic.isUserLoggedIn() ? <CurrentWeek onLogOut={handleLogout} onRetrieveRecipe={handleRetrieveRecipe} /> : history.push('/login')} />
    <Route path="/create-menu" render={() => logic.isUserLoggedIn() ? <CreateMenu onLogout={handleLogout} onRegisterDay={handleRegisterDay}/> : history.push('/login')} />
    <Route path="/user-profile" render={() => logic.isUserLoggedIn() ? <UserProfile onLogOut={handleLogout} /> : history.push('/login')} />
    <Route path="/recipe-detail/:recipeId" render={() => logic.isUserLoggedIn() ? <RecipeDetail onLogOut={handleLogout} /> : history.push('/login')} />
  </>
})



{/* <div className="body">
  {view !== 'home' && 
  <header>
      <nav className="nav">
        <a className="nav__h2" href="index.html"><h2 className="nav__h2">MenuPlanner</h2></a>
      </nav>
    </header>}
      {view !== 'home' && <main className="main">
      {view !== 'home' && view !== 'login' && view !== 'register' && <h3 className="main__h3">Create Menu</h3>}
      {view !== 'login' && <a className="main__login main__button" href="" onClick={handleGoToLogin}>Login</a>}
      {view !== 'register' && <a className="main__register main__button" href="" onClick={handleGoToRegister}>Register</a>}
    </main>}
    <Route path="/register" render={() => <Register onBack={handleBack} onRegister={handleRegister} />} />
    <Route path="/login" render={() => <Login onBack={handleBack} onLogin={handleLogin} />} />
    {<Route path="/home" render={() => <Home onLogout={handleLogout}/>} />}
    {<Route path="/current-week" render={() => <CurrentWeek onGoHome={handleGoHome} onRetrieveWeek={handleGoToCurrentWeek}onRetrieveDay={handleRetrieveDay} onRetrieveRecipe={handleRetrieveRecipe} onLogout={handleLogout}/>} />}
    {<Route path="/create-menu" render={() => <CreateMenu onCreate={handleGoToCreateMenu} onRegisterDay={handleRegisterDay} onRetrieveRecipe={handleRetrieveRecipeDay}/>} />}
  </div> */}