function WelcomeAnchors(props) {
    return <>
        <nav className="welcomeAnchors">
            <ul>
                <li><a href="" onClick={event => {
                    event.preventDefault()

                    props.onRegister()
                }} >Register</a></li>
                <li><a href="" onClick={event => {
                    event.preventDefault()

                    props.onLogin()
                }} >Login</a></li>
            </ul>
        </nav>
    </>
}