function InitialButton() {
  return (
    <>
      <a
        href=''
        onClick={event => {
          event.preventDefault()

          onNavReg()
        }}
      >
        Register
      </a>

      <a
        href=''
        onClick={event => {
          event.preventDefault()

          onNavLog()
        }}
      >
        Login
      </a>
    </>
  )
}
