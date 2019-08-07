function Login({ onLogin, onBack, error }) {
  return (
    <>
      <h2>Enter login data</h2>
      <form
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

        <button>Go!</button>
        <a
          href="#"
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
