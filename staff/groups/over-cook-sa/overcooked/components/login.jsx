function Login({ onLogin, onBack, error }) {
  return (
    <>
      <h2 className="main__nav__title">Log in !</h2>
      <form className="main__nav__form"
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
        <label htmlFor="email" className="main__nav__form__lab">
          E-mail 
        </label>
        <input placeholder="Email" type="email" name="email" />
        <label htmlFor="password" className="main__nav__form__lab">
          Password 
        </label>
        <input placeholder="Password" type="password" name="password" />

        <button className='main__nav__form__go'>Go !</button>
        <a
          href="#" className='main__nav__form__back'
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
