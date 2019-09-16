import React, {  useState } from 'react'
import Context from '../Context'
import logic from '../../logic'
import Login from '../Login'
import Register from '../Register'
import InitialHeader from '../InitialHeader'
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
        
        <InitialHeader />

        <h2>The soccer fantasy game for all the enthusiastics of football</h2>
        
        <div className="landing">         

        
        <ul>
          <li><a  className="links" href="" onClick={handleGoToRegister}>Register</a></li>
          <li><a  className="links" href="" onClick={handleGoToLogin}>Login</a></li>
        </ul>
        </div>
        </>
    
        
     
}

export default withRouter(Landing)