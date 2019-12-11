import React from 'react'
import { withRouter } from 'react-router-dom'

function RegisterSuccess({ history }) {
    
    function handleGoToLogin(event) {
        event.preventDefault()

        history.push(`/sign-in`)
    }

    return <section className="register-success"> 

        <p>User successfully registered! You can now proceed to <a className="register-success__link" href="#" onClick={handleGoToLogin}>Sign in</a></p>
    
    </section>
}

export default withRouter(RegisterSuccess)