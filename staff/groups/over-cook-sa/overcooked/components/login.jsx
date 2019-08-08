function Login({ onLogin, onBack, error }) {
  return (
    <>
      <h2 className='loginTitle'>Login</h2>
      
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
        <label>
          E-mail <input type="email" name="email" />
        </label>
        <label>
          Password <input type="password" name="password" />
        </label>

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
    </>
  )
}
