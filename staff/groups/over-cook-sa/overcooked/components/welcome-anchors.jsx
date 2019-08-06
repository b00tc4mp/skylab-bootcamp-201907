function WelcomeAnchors({ onLogin, onRegister }) {
  return (
    <>
      <nav className="welcomeAnchors">
        <ul>
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
