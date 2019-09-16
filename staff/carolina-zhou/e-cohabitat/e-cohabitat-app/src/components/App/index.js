import React, { useState } from 'react'
import moment from "moment"
import logic from '../../logic'
import './index.sass'

import Context from '../context'
import Header from '../Header'
import Landing from '../Landing'
import Register from '../Register'
import RegisterSuccess from '../Register-success'
import Login from '../Login'
import Home from '../Home'
import Space from '../Space'
import SpaceRegister from '../Space-register'
import CouserRegister from '../Couser-register'
import Month from '../Month'
import Week from '../Week'
import Day from '../Day'
import TaskRegister from '../Task-register'
import Footer from '../Footer'

import { withRouter, Route } from 'react-router-dom'

function App({ history }) {

  const [mySpace, setMySpace] = useState()
  const [chores, setChores] = useState()
  const [ currentDate, setCurrentDate ] = useState(moment())
  const [ thisDay, setThisDay ] = useState(moment())
  const [ thisHour, setThisHour ] = useState()
  const [ myTask, setMyTask ] = useState()
  const [ tasks, setTasks ] = useState()
  
  return (<>
    
    <Context.Provider value = {{ 
      mySpace, setMySpace, 
      currentDate, setCurrentDate, 
      thisDay, setThisDay, 
      thisHour, setThisHour, 
      chores, setChores, 
      myTask, setMyTask,
      tasks, setTasks 
    }}>

      <Header/>
      <main className="main">
        <Route exact path="/" render={() => logic.isUserLoggedIn() ? history.push('/home') : <Landing/>} />
        <Route path="/sign-up" render={() => logic.isUserLoggedIn() ? history.push('/home') : <Register />} />
        <Route path="/sign-up-success" render={() => logic.isUserLoggedIn() ? history.push('/home') : <RegisterSuccess />} />
        <Route path="/sign-in" render={() => logic.isUserLoggedIn() ? history.push('/home') : <Login />} />
        <Route path="/home" render={() => logic.isUserLoggedIn() ? <Home /> :  history.push('/')} />
        <Route path="/spaces/:spaceId" render={history => !logic.isUserLoggedIn() ? history.push('/') : <Space />} />
        <Route path="/space-register" render={() => !logic.isUserLoggedIn() ? history.push('/') : <SpaceRegister />} />
        <Route path="/:spaceId/couser-register" render={() => !logic.isUserLoggedIn() ? history.push('/') : <CouserRegister />} />
        <Route path="/:spaceId/month" render={() => !logic.isUserLoggedIn() ? history.push('/') : <Month />} />
        <Route path="/:spaceId/week" render={() => !logic.isUserLoggedIn() ? history.push('/') : <Week />} />
        <Route path="/:spaceId/day" render={() => !logic.isUserLoggedIn() ? history.push('/') : <Day />} />
        <Route path="/:spaceId/task-register" render={() => !logic.isUserLoggedIn() ? history.push('/') : <TaskRegister />} />
      </main>
      <Footer/>
      
    </Context.Provider>
    
  </>)
}

export default withRouter(App)