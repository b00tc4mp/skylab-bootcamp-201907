function Register({ onRegister, onBack, error }) {
  return (
    <>
    <nav className="landingContainer">
      <ul className="landingContainer_container">
      <form className="loginForm"
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
        <label htmlFor="name" className="hide">
          Name 
        </label>
        <input placeholder="Name" type="text" name="name" />
        <label htmlFor="surname" className="hide">
          Surname 
        </label>
        <input placeholder="Surname" type="text" name="surname" />
        <label htmlFor="email" className="hide">
          E-mail 
        </label>
        <input placeholder="Email" type="email" name="email" />
        <label htmlFor="password" className="hide">
          Password 
        </label>
        <input placeholder="Password" type="password" name="password" />
        <label htmlFor="repassword" className="hide">
          Repeat password 
        </label>
        <input placeholder="Repeat Password" type="password" name="repassword" />
        <button className='btnGo'>Register</button>
        <a className="backButton" href="#"
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
