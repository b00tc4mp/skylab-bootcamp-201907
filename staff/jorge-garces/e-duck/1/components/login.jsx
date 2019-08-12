function Login(props) {
  return (
    <>
      <form
        onSubmit={event => {
          event.preventDefault()

          const {
            target: {
              email: { value: email },
              password: { value: password }
            }
          } = event

          props.onLogin(email, password)
          if (__loggedUser__ === true) {
            handleVisible('logged')
          } else {
            handleVisible('login')
          }
        }}
      >
        <label htmlFor='email'>E-mail</label>
        <input type='email' name='email' />
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' name='password' />
        <button>Submit</button>
      </form>

      <a
        href=''
        onClick={event => {
          event.preventDefault()

          props.onBack()
        }}
      >
        Back
      </a>
    </>
  )
}
