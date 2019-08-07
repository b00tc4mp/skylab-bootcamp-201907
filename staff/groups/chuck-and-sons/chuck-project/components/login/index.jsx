function Login(props){

    const{
        onGoToLanding, 
        onLogin, 
        error
    } = props

    return <>
        <div className = "form">

            <form
                className = "form__login"
                
                onSubmit={event => {
                    event.preventDefault()

                    const { target : { username : { value : username } , password : { value : password } } } = event

                    onLogin(username , password)
            }}>

                <label htmlFor = "username">Email
                    <input type="email" name="username" id="username" />
                </label>

                <label htmlFor = "password">Password
                    <input type="password" name="password" id="password" />
                </label>

                <button className = "btn btn__submit">Login</button>
            </form>

            <button className = "btn btn__back" onClick={ event => { onGoToLanding() } }>Go back</button>

            { error && <Feedback className = "feedback feedback--error" message = {error}/> }

        </div>
    </>
}