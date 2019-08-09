function WelcomeAnchors({ onLogin, onRegister }) {
  return (
    <>
      <nav className="landingContainer">

        <ul className="landingContainer_container">
          <li className="regLog">
            <a className="landingButton"
              href=""
              onClick={event => {
                event.preventDefault()

                onRegister()
              }}
            >
              Register
            </a>
          </li>
          <li>
            <a className="landingButton"
              href=""
              onClick={event => {
                event.preventDefault()

                onLogin()
              }}
            >
              Login
            </a>
          </li>
        </ul>
      </nav>
    </>
  )
}
