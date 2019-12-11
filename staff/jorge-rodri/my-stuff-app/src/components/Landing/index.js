import React from 'react';
import { A } from 'hookrouter'

//import logic from '../../logic'

function Landing() {
  /* const handleRegister = async (name, surname, email, password) => {
    try {
      await logic.registerUser(name, surname, email, password)

      console.log('ok, registered... TODO show succeed register panel')
    } catch ({ message }) {
      console.log('fail register', message)
    }
  } */
 
/*   const handleLogin = async (email, password) => {
    try {
      await logic.authenticateUser(email, password)

      console.log('ok, registered... TODO show succeed register panel')
    } catch ({ message }) {
      console.log('fail register', message)
    }
  } */

  return (<>
    <header>
      <ul>
        <li><A href="/login">Login</A></li>
        <li><A href="/register">Register</A></li>
      </ul>
    </header>
  </>
  )
}

export default Landing

