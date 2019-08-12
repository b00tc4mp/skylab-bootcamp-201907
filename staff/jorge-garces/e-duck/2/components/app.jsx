const { Component } = React

class App extends Component {
  constructor() {
    super()

    this.state = { view: 'landing', email: undefined } // 'register', 'login', ...

    this.handleGoToRegister = this.handleGoToRegister.bind(this)
    this.handleBackToLanding = this.handleBackToLanding.bind(this)
    this.handleGoToLogin = this.handleGoToLogin.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleGoToRegister() {
    this.setState({ view: 'register' })
  }

  handleBackToLanding() {
    this.setState({ view: 'landing' })
  }

  handleRegister(name, surname, email, password) {
    try {
      logic.register(name, surname, email, password)

      this.setState({ view: 'register-success' })
    } catch (error) {
      // TODO
    }
  }

  handleGoToLogin() {
    this.setState({ view: 'login' })
  }

  handleLogin(email, password) {
    try {
      logic.authenticate(email, password)

      this.setState({ view: 'landing', email })
    } catch (error) {
      // TODO
    }
  }

  handleLogout() {
    this.setState({ email: undefined })
  }

  render() {
    const {
      state: { view, email },
      handleGoToRegister,
      handleRegister,
      handleBackToLanding,
      handleGoToLogin,
      handleLogin,
      handleLogout
    } = this

    return (
      <>
        {view === 'landing' && (
          <Landing
            onRegister={handleGoToRegister}
            onLogin={handleGoToLogin}
            user={email}
            onLogout={handleLogout}
          />
        )}
        {view === 'register' && (
          <Register onBack={handleBackToLanding} onRegister={handleRegister} />
        )}
        {view === 'register-success' && (
          <RegisterSuccess onLogin={handleGoToLogin} />
        )}
        {view === 'login' && (
          <Login onBack={handleBackToLanding} onLogin={handleLogin} />
        )}
      </>
    )
  }
}
