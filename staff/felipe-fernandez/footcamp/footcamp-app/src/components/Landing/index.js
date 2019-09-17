import React from 'react'
import InitialHeader from '../InitialHeader'
import { withRouter } from "react-router-dom"


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
        
        <section className="body-landing">
         
        <InitialHeader />
          <h2>The soccer fantasy game for all football enthusiastics</h2>
          
          <div className="body-landing__content">  
            <ul>
                <li><a  className="body-landing__links" href="" onClick={handleGoToRegister}>Register</a></li>
                <li><a  className="body-landing__links" href="" onClick={handleGoToLogin}>Login</a></li>
              </ul>
          </div>
        </section>
        </>
    
        
     
}

export default withRouter(Landing)