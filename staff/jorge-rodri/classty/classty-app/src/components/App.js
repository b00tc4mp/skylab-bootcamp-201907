import React, { useState, useEffect } from 'react'
import Context from './Context'
import logic from '../logic'
import Login from './Login'
import ClassList from './Class-List'
import Register from './Register'
import Mentor from './Mentor'
import Subject from './Subject'
import Exams from './Exams'
import Homeworks from './Homeworks'
import SubjectList from './Subject-List'
import RemoveClass from './Remove-Class'
import RemoveTeacher from './Remove-Teacher'
import RemoveSubject from './RemoveSubject'
import TeacherList from './Teacher-List'
import StudentList from './Student-List'
import SubjectTeacherList from './Subject-Teach-List'
import StudentHome from './Student-Home'
import TeacherHome from './Teacher-Home'
import Profile from './Profile'
import { withRouter, Route, Redirect } from 'react-router-dom'

//import './App.sass';

function App({ history }) {
  
  const [view, setView] = useState('')

  const [user, setUser] = useState(undefined)

  const [subjects, setSubjects] = useState(undefined)

  const [classes, setClasses] = useState(undefined)

  const [teachers, setTeachers] = useState(undefined)

  const [students, setStudents] = useState(undefined)

   const [posts, setPosts] = useState(undefined)
   
  const [exams, setExams] = useState(undefined)
    

  const handleGoToRegister = event => {
    event.preventDefault()

    setView('register')

    history.push('/register')
  }

  const handleGoToLogin = event => {
    event.preventDefault()

    setView('login')

    history.push('/login')
  }

  useEffect(() => {
    if (history.location.pathname === '/') setView(undefined)
  }, [history.location])

  return (

    <>
      <Context.Provider value={{ posts, setPosts, exams, setExams , students, setStudents, classes, setClasses, view, setView, user, setUser, subjects, setSubjects, teachers, setTeachers }} >

        <header>
          {view !== 'home' && !logic.user.isUserLoggedIn() && <nav>
            <ul>
              {view !== 'login' && <li><a href="" onClick={handleGoToLogin}>Login</a></li>}
              {view !== 'register' && <li><a href="" onClick={handleGoToRegister}>Register</a></li>}
            </ul>
          </nav>
          }
        </header>

        {logic.user.isStudent() && <Redirect to="/student-home" />}
        {logic.user.isMentor() && <Redirect to="/admin" />}
        {logic.user.isTeacher() && <Redirect to="/teacher-home" />}


        <Route path="/register" render={() => <Register />} />
        <Route path="/login" render={() => <Login />} />

        {/* <Route path="/subject/:id" render={() => !logic.isUserLoggedIn() ? history.push('/') : <StudentHome /> } />       */}
        <Route path="/student-home" render={() => logic.user.isUserLoggedIn()  ? <StudentHome /> : history.push('/')} />
        <Route path="/admin" render={() => logic.user.isUserLoggedIn() ? <Mentor /> : history.push('/')} />
        <Route path="/class-list" render={() => logic.user.isUserLoggedIn() ? <ClassList /> : history.push('/')} />
        <Route path="/remove-class" render={() => logic.user.isUserLoggedIn() ? <RemoveClass /> : history.push('/')} />
        <Route path="/teacher-list" render={() => logic.user.isUserLoggedIn() ? <TeacherList /> : history.push('/')} />
        <Route path="/remove-teacher" render={() => logic.user.isUserLoggedIn() ? <RemoveTeacher /> : history.push('/')} />
        <Route path='/teacher-list-subject' render={() => logic.user.isUserLoggedIn() ? <SubjectTeacherList /> : history.push('/')} />
        <Route path='/student-list' render={() => logic.user.isUserLoggedIn() ? <StudentList /> : history.push('/')} />
        <Route exact path='/subject/:id' render={() => logic.user.isUserLoggedIn() ? <Subject  /> : history.push('/')} />
        <Route path='/subject/exams/:id' render={() => logic.user.isUserLoggedIn() ? <Exams /> : history.push('/')} />
        <Route path='/subject/homeworks/:id' render={() => logic.user.isUserLoggedIn() ? <Homeworks /> : history.push('/')} />
        <Route path='/teacher-home' render={() => logic.user.isUserLoggedIn() ? <TeacherHome  /> : history.push('/')} />
        <Route path='/profile/:id' render={() => logic.user.isUserLoggedIn() ? <Profile /> : history.push('/')} />
        <Route path='/subject-list' render={() => logic.user.isUserLoggedIn() ? <SubjectList /> : history.push('/')} />
        <Route path='/remove-subject' render={() => logic.user.isUserLoggedIn() ? <RemoveSubject /> : history.push('/')} />


      </Context.Provider>
    </>
  );
}

export default withRouter(App);
