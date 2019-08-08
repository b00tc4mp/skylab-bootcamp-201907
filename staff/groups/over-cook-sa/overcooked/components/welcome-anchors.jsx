function WelcomeAnchors({ onLogin, onRegister }) {
  return (
    <>
      <nav className="landingContainer">

        <ul className="landingContainer_container">
          <li>
            <a
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
            <a
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
