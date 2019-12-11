function Login(props) {

    const {
        onGoToLanding,
        onLogin,
        error
    } = props

    return <>
        <div className="form">

            <h2>Login</h2>

            <form
                className="form__landing form--login"

                onSubmit={event => {
                    event.preventDefault()

                    const { target: { username: { value: username }, password: { value: password } } } = event

                    onLogin(username, password)
                }}>

                <label htmlFor="username">Email</label>
                <input type="email" name="username" id="username" />


                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />


                <button className="btn btn__submit">Login</button>
            </form>

            <button className="btn btn__back" onClick={event => {
                event.preventDefault()
                onGoToLanding()
            }}>Go back</button>

            {error && <Feedback className="feedback feedback--error" message={error} />}

        </div>
    </>
}