import React from 'react';
import { useRoutes, A } from 'hookrouter'
import './index.sass';
import routes from '../../routes'
import Landing from '../Landing'
//import logic from '../../logic'

function App() {
  const routeResult = useRoutes(routes)
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
      <Landing />
      {routeResult}
  </>
  )
}

export default App
 
