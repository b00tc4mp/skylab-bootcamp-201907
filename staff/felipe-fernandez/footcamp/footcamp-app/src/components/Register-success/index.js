import React from 'react'
import { withRouter } from "react-router-dom";

function RegisterSuccess(props){
    
    const { history } = props
    
    return (
        <div>
            <h2>Register Success</h2>

            <a href="#" onClick={event => {
            event.preventDefault()
            history.push('/home')
              }}>Go back</a>

            <a href="#" onClick={event => {
                event.preventDefault()
                history.push('/login')
            }}>Go to Login</a>

       </div>
        
    )
}

export default withRouter(RegisterSuccess)