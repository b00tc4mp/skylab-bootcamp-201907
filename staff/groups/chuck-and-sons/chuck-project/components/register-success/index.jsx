function RegisterSuccess(props){

    const  { onGoToLanding , onGoToLogin } = props
    
    return <>
        <h1>Register success</h1>
        <div className = "register-succes">
            <p className = "register-succes__text">Your user has been registered.

                <a href='' className = "btn btn__login" onClick = { event => {
                        event.preventDefault()
                        onGoToLogin()
                    }
                }> Login </a>
            
                or
            
                <a href='' className = "btn btn__search" onClick = { event => {
                        event.preventDefault()
                        onGoToLanding()
                    }
                }> Search</a>
            </p>
        </div>
    </>
}