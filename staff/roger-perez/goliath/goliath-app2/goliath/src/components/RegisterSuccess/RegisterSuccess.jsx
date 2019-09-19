import React from 'react'
function RegisterSuccess({ onLogin }) {
    
    return <>
    <div className="registerForm">
        <div className="containerSuccess">
        <h2>Thanks for using Goliath, we hope you enjoy it.</h2>

        <p>Now you can proceed to <a href="" onClick={event => {
                event.preventDefault()
                onLogin()
            }}>login</a>.
        </p>

        </div>

    </div>
    </>
}

export default RegisterSuccess