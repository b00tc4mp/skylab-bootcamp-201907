function RegisterSuccess({ onLogin }) {
  return (
    <section className="register-succes">
    <p> User successfully registered, you can now proceed to{' '}
      <a className="register-succes__login" href="" onClick={event => {
          event.preventDefault()

          onLogin()
        }} > login </a> .</p>
        </section>
  )
}
