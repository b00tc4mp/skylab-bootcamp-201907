const { Component } = React;

let sequence = []

class App extends Component {
  constructor() {
    super();

    let credentials;
    

    const { id, token } = sessionStorage;

    id && token && (credentials = { id, token });

    this.state = { view: "landing", credentials, error: undefined };

    this.handleGoToRegister = this.handleGoToRegister.bind(this);
    this.handleBackToLanding = this.handleBackToLanding.bind(this);
    this.handleGoToLogin = this.handleGoToLogin.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleGoToDrumkit = this.handleGoToDrumkit.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }

  handleGoToRegister() {
    this.setState({ view: "register" });
  }

  handleBackToLanding() {
    this.setState({ view: "landing" });
  }

  handleRegister(
    name,
    surname,
    instrument,
    description,
    email,
    password,
    repassword
  ) {
    try {
      logic
        .registerUser(
          name,
          surname,
          instrument,
          description,
          email,
          password,
          repassword
        )
        .then(() => this.setState({ view: "register-success" }))
        .catch(({ message }) => {
          this.setState({ error: message });
        });
    } catch ({ message }) {
      this.setState({ error: message });
    }
  }

  handleGoToLogin() {
    this.setState({ view: "login" });
  }
  handleGoToDrumkit() {
    this.setState({ view: "drumkit" });
  }

  handleLogin(email, password) {
    try {
      logic
        .authenticateUser(email, password)
        .then(credentials => {
          sessionStorage.id = credentials.id;
          sessionStorage.token = credentials.token;

          this.setState({ view: "landing", credentials });
        })
        .catch(({ message }) => this.setState({ error: message }));
    } catch ({ message }) {
      this.setState({ error: message });
    }
  }

  handleLogout() {
    delete sessionStorage.id;
    delete sessionStorage.token;

    this.setState({ credentials: undefined });
  }
  handleChange() {
  

    if(sequence === 0 ){
      sequence = 1
    }
    else{ sequence = 0}
   
    console.log(sequence)
    }

  render() {
    const {
      state: { view, credentials, error },
      handleGoToRegister,
      handleRegister,
      handleBackToLanding,
      handleGoToLogin,
      handleLogin,
      handleLogout,
      handleGoToDrumkit,
      handleChange
    } = this;

    return (
      <>
        {view === "landing" && (
          <Landing
            onRegister={handleGoToRegister}
            onLogin={handleGoToLogin}
            credentials={credentials}
            onLogout={handleLogout}
            onDrumkit={handleGoToDrumkit}
          />
        )}
        {view === "register" && (
          <Register
            onBack={handleBackToLanding}
            onRegister={handleRegister}
            error={error}
          />
        )}
        {view === "register-success" && (
          <RegisterSuccess onLogin={handleGoToLogin} />
        )}
        {view === "login" && (
          <Login
            onBack={handleBackToLanding}
            onLogin={handleLogin}
            error={error}
          />
        )}
         {view === "drumkit" && (
          <Drumkit
          onBack={handleBackToLanding}
          onChange={handleChange}
          error={error}
          />
        )}
      </>
    );
  }
}