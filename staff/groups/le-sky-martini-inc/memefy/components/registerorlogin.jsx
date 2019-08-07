function RegisterOrLogin({ onRegister, onLogin, onBack, error }) {
    return <>
    <h1>RegisterOrLogin</h1>
        <ul><li>

            <a href="" onClick={event => {
                event.preventDefault()
                onRegister()
                }}>Register</a>


            <a href="" onClick={event => {
                event.preventDefault()
                onLogin()
                }}>Login</a>

        </li></ul>


        {error && <Feedback message={error} />}


            <a href="" onClick={event => {
                event.preventDefault()
                onBack()     // Hacer que sea -> Go back to results. Go back genuino.
            }}>Go Home</a>
    </>
}