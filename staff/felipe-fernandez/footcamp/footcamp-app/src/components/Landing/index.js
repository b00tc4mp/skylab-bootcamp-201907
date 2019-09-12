import React, {  useState } from 'react'
import Context from '../Context'
import logic from '../../logic'
import Login from '../Login'
import Register from '../Register'
import { Route, Link, withRouter } from "react-router-dom"


function Landing(props) {
  const { history} = props
  const [view, setView] = useState(undefined)


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



  const handleLogout = () => {
    logic.logUserOut()

    setView(undefined)
    history.push('/')
  }


    return  <>
  
        <header>
           <h1>FANTASY SKYLAB</h1>
        </header>
         


      {view !== 'home' && <body>
        <ul>
          {view !== 'register' && <li><a href="" onClick={handleGoToRegister}>Register</a></li>}
          {view !== 'login' && <li><a href="" onClick={handleGoToLogin}>Login</a></li>}
        </ul>
        </body>}
    
        
        
      </>
}

export default withRouter(Landing)