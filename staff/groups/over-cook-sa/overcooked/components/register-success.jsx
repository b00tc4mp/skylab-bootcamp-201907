function RegisterSuccess({ onLogin }) {
  return (
    <p className="main__nav__text"> User successfully registered, you can now proceed to{' '}
      <a className="main__nav__text__a" href="" onClick={event => {
          event.preventDefault()
          
          onLogin()
        }} > login </a> .</p>
  )
}
