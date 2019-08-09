function Login({ onLogin, onBack, error }) {
  return (
    <>
    <nav className="landingContainer">
    <ul className="landingContainer_container">

      <form className="loginForm"
        onSubmit={event => {
          event.preventDefault()

          const {
            target: {
              email: { value: email },
              password: { value: password }
            }
          } = event

          onLogin(email, password)
        }}
      >
        <label htmlFor="email" className="hide">
          E-mail 
        </label>
        <input placeholder="Email" type="email" name="email" />
        <label htmlFor="password" className="hide">
          Password 
        </label>
        <input placeholder="Password" type="password" name="password" />

        <button className='btnGo'>Go!</button>
        <a
          href="#" className='backButton'
          onClick={event => {
            event.preventDefault()
            onBack()
          }}
        >
          Back
        </a>
      </form>
      {error && <Feedback message={error} />}
      </ul>
      </nav>
    </>
  )
}
