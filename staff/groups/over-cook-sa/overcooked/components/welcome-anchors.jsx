function WelcomeAnchors({ onLogin, onRegister }) {
  return (
    <>
      <nav>

        <ul className="main__nav__welcome">
          <li className="main__nav__welcome__item">
            <a className="main__nav__welcome__button"
              href=""
              onClick={event => {
                event.preventDefault()

                onRegister()
              }}
            >
              Register
            </a>
          </li>
          <li className="main__nav__welcome__item">
            <a className="main__nav__welcome__button"
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
