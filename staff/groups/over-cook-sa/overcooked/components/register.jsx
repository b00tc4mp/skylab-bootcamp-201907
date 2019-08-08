function Register({ onRegister, onBack, error }) {
  return (
    <>
    <nav className="landingContainer">
      <ul className="landingContainer_container">
      <h2>Register Now</h2>
      <form
        onSubmit={event => {
          event.preventDefault()

          const {
            target: {
              name: { value: name },
              surname: { value: surname },
              email: { value: email },
              password: { value: password },
              repassword: { value: repassword }
            }
          } = event

          onRegister(name, surname, email, password, repassword)
        }}
      >
        <label>
          Name <input type="text" name="name" />
        </label>
        <label>
          Surname <input type="text" name="surname" />
        </label>
        <label>
          E-mail <input type="email" name="email" />
        </label>
        <label>
          Password <input type="password" name="password" />
        </label>
        <label>
          Repeat password <input type="password" name="repassword" />
        </label>
        <button>Register</button>
        <a className="back" href="#"
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
