import React from 'react'
import { withRouter } from "react-router-dom"
import InitialHeader from '../InitialHeader'

function RegisterSuccess(props){
    
    const { history } = props
    
    return (
        <div>
            <InitialHeader />

            <section class="register-successful">
            <h2>Register Success</h2>

            <a href="#" onClick={event => {
            event.preventDefault()
            history.push('/')
              }}>Go back</a>

            <a href="#" onClick={event => {
                event.preventDefault()
                history.push('/login')
            }}>Go to Login</a>
        </section>
       </div>
        
    )
}

export default withRouter(RegisterSuccess)