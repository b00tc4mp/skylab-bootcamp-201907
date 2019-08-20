function Register({ onRegister, onBack, error }) {
  return (
    <>
      <h3 className="main__nav__title">Register</h3>
      <form className="main__nav__form"
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
        <label htmlFor="name" className="main__nav__form__lab">
          Name 
        </label>
        <input placeholder="Name" type="text" name="name" />
        <label htmlFor="surname" className="main__nav__form__lab">
          Surname 
        </label>
        <input placeholder="Surname" type="text" name="surname" />
        <label htmlFor="email" className="main__nav__form__lab">
          E-mail 
        </label>
        <input placeholder="Email" type="email" name="email" />
        <label htmlFor="password" className="main__nav__form__lab">
          Password 
        </label>
        <input placeholder="Password" type="password" name="password" />
        <label htmlFor="repassword" className="main__nav__form__lab">
          Repeat password 
        </label>
        <input placeholder="Repeat Password" type="password" name="repassword" />
        <button className="main__nav__form__go">Register</button>
        <a className="main__nav__form__back" href="#"
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
