import React, { useEffect } from 'react'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'
import Login from '../Login'

function Landing({history}) {

    const handleGoToRegister = event => {
        event.preventDefault()
    
        history.push('/register')
    }
    
      const handleGoToLogin = event => {
        event.preventDefault()
    
        history.push('/login')
    }

    return  <>
  
        <section>
            <nav>
                <ul>
                    <li><a href="" onClick={handleGoToRegister}>Register</a></li>
                    <li><a href="" onClick={handleGoToLogin}>Participate</a></li>
                </ul>
            </nav>
        </section>
        
      </>
}
export default withRouter(Landing)

