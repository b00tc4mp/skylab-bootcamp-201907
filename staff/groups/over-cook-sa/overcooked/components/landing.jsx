const { Component } = React

class Landing extends Component {
  constructor() {
    super()

    this.state = {
      view: 'first',
      mealRandom: null,
      credentials: undefined,
      user: undefined,
      error: undefined
    }

    this.onRandomRecipe = this.onRandomRecipe.bind(this)
    this.handleGoToLogin = this.handleGoToLogin.bind(this)
    this.handleGoToRegister = this.handleGoToRegister.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  componentWillMount() {
    this.onRandomRecipe()

    const {
      props: { credentials }
    } = this

    if (credentials) {
      const { id, token } = credentials

      try {
        logic
          .retrieveUser(id, token)
          .then(user => this.setState({ user }))
          .catch(({ message }) => this.setState({ error: message }))
      } catch ({ message }) {
        this.setState({ error: message })
      }
    }
  }

  onRandomRecipe = () => {
    logic.retrieveRandomRecipe()
        .then(meal => {
          const { strYoutube : youtube } = meal
          meal.strYoutube = youtubeParse(youtube)
        //console.log(meal)
        this.setState({ mealRandom: meal })
      
    })
  }

  handleRegister(name, surname, email, password, repassword) {
    try {
      logic
        .registerUser(name, surname, email, password, repassword)
        .then(() => this.setState({ view: 'register-success' }))
        .catch(({ message }) => this.setState({ error: message }))
    } catch ({ message }) {
      this.setState({ error: message })
    }
  }

  handleLogin(email, password) {
    try {
      logic
        .authenticateUser(email, password)
        .then(credentials => this.setState({ view: 'first', credentials }))
        .catch(({ message }) => this.setState({ error: message }))
    } catch ({ message }) {
      this.setState({ error: message })
    }
  }

  handleGoToRegister() {
    this.setState({ view: 'register', mealRandom: null })
  }

  handleGoToLogin() {
    this.setState({ view: 'login', mealRandom: null })
  }

  render() {
    const {
      state: { view, mealRandom },
      handleGoToLogin,
      handleGoToRegister,
      handleRegister,
      handleLogin
    } = this

    return (
      <>
        <header>
          <BigHeader />
        </header>
        <main>
          <section>
            {view === 'register' && <Register onRegister={handleRegister} />}
            {view === 'first' && (
              <WelcomeAnchors
                onRegister={handleGoToRegister}
                onLogin={handleGoToLogin}
              />
            )}
            {view === 'login' && <Login onLogin={handleLogin} />}
            {view === 'register-success' && (
              <RegisterSuccess onLogin={handleGoToLogin} />
            )}
          </section>
          <section>{mealRandom && <RecipeItem meal={mealRandom} />}</section>
        </main>
        <footer>
          <Footer />
        </footer>
      </>
    )
  }
}
