import React, { useContext, useEffect } from 'react'
import Context from '../Context'
import logic from '../../logic'
import Login from '../Login'
import Register from '../Register'


export default function Landing(history) {

   
    return  <>
  
        <section>
          {/* <h1>FANTASY SKYLAB</h1>
          <a href="#" onClick={event => {
                event.preventDefault()
                history.push('/login')
            }}>LOGIN</a>
           <a href="#" onClick={event => {
                event.preventDefault()
                history.push('/register')
            }}>REGISTER</a>
          */}

          <h2>LOGIN</h2>
          <Login />
          <h2>REGISTER</h2>
          <Register />
        </section>
        
      </>
}

