import React from 'react'
import { withRouter } from "react-router-dom"
import InitialHeader from '../InitialHeader'

function RegisterSuccess(props){
    
    const { history } = props
    
    return (
        <div>
            <InitialHeader />

            <div className="register-successful">
            <h2>REGISTER SUCCESS</h2>

            <a href="#" onClick={event => {
            event.preventDefault()
            history.push('/')
              }}> <i className="fas fa-arrow-circle-left fa-2x"> </i></a>

            <a href="#" onClick={event => {
                event.preventDefault()
                history.push('/login')
            }}>Go to Login</a>
         </div>
       </div>
        
    )
}

export default withRouter(RegisterSuccess)