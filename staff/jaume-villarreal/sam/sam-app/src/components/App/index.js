import React, { useState } from 'react'
import { HashRouter as Router , withRouter , Redirect , Route } from 'react-router-dom'
import MyContext from '../ProviderContext';

import logic from '../../logic'

import Landing from '../Landing'
import Home from '../Home'
import Header from '../Header'
import Login from '../Login'
import RegisterTutor from '../RegisterTutor'
import RegisterStudent from '../RegisterStudent'
import RegisterSuccess from '../RegisterSuccess'
import UpdateSuccess from '../UpdateSuccess'
import ProcessSuccess from "../ProcessSuccess"
import UpdateStudent from '../StudentUpdate'
import RegisterEnrollment from "../RegisterEnrollment"
import CheckEnrollment from "../CheckEnrollment"

import './index.sass'
import '../../styles/normalize.sass'

function App() {
  const [tutor , setTutor] = useState(undefined)
  const [studentId , setStudentId] = useState(undefined)

  return  <MyContext.Provider value={{ tutor , setTutor , studentId , setStudentId }}>  
            <div className="App">
                <Header/>
                <main className="main-wrapper">
                  <Router>
                    <Route exact path="/" render={ () => !logic.isUserLoggedIn() ? <Landing /> : <Redirect to="/home"/> } />
                    <Route path="/register" render={ () => !logic.isUserLoggedIn() ? <RegisterTutor /> : <Redirect to="/home"/> }/>
                    <Route path="/register-student" render={ () => logic.isUserLoggedIn() ? <RegisterStudent /> : <Redirect to="/login"/> }/>
                    <Route path="/login" render={ () => !logic.isUserLoggedIn() ? <Login /> : <Redirect to="/home"/> } />
                    <Route path="/register-success" render={ () => !logic.isUserLoggedIn() ? <RegisterSuccess /> : <Redirect to="/home"/> } />
                    <Route path="/process-success" render={ () => logic.isUserLoggedIn() ? <ProcessSuccess /> : <Redirect to="/home"/> } />
                    <Route path="/update-success" render={ () => logic.isUserLoggedIn() ? <UpdateSuccess /> : <Redirect to="/login"/> } />
                    <Route path="/home" render={ () => logic.isUserLoggedIn() ? <Home /> : <Redirect to="/"/> } />
                    <Route path="/student-update" render={ () => logic.isUserLoggedIn() ? <UpdateStudent /> : <Redirect to="/"/> } />
                    <Route path="/register-enrollment" render={ () => logic.isUserLoggedIn() ? <RegisterEnrollment /> : <Redirect to="/"/> } />
                    <Route path="/check-enrollment" render={ () => logic.isUserLoggedIn() ? <CheckEnrollment /> : <Redirect to="/"/> } />
                </Router>
              </main>
            </div>
          </MyContext.Provider>
          }
export default withRouter(App)
