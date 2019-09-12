import React, {  useState } from 'react'
import Context from '../Context'
import logic from '../../logic'
import Login from '../Login'
import Register from '../Register'
import { Route, Link, withRouter } from "react-router-dom"


function Landing(props) {
  const { history} = props


  const handleGoToRegister = event => {
    event.preventDefault()
    history.push('/register')
  }

  const handleGoToLogin = event => {
    event.preventDefault()
    history.push('/login')
  }



    return  <>
  
        <header>
           <h1>FANTASY SKYLAB</h1>
        </header>
         


        <ul>
    <li><a href="" onClick={handleGoToRegister}>Register</a></li>
    <li><a href="" onClick={handleGoToLogin}>Login</a></li>
        </ul>
     
    
        
        
      </>
}

export default withRouter(Landing)