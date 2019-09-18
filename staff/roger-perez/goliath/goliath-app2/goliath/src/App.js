import React, { Component } from 'react'
import Landing from './components/landing'
import Register from './components/register'
import RegisterSuccess from './components/register-success'
import Login from './components/login'
import Drumkit from './components/drumkit'
import Jamtrack from './components/jamtrack'
import logic from '../src/logic/index'

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
    this.handleChange = this.handleChange.bind(this);
    this.handleRetrieve = this.handleRetrieve.bind(this);
    this.handleUpdateDrumkit = this.handleUpdateDrumkit.bind(this);
    this.handleDrumkitEdit = this.handleDrumkitEdit.bind(this);
    this.handleGoToJamtrack = this.handleGoToJamtrack.bind(this);

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

  handleRetrieve(id,token){
    try{
      logic
      .retrieveUser(id,token)
      .then(user => {
        this.setState({ view: "drumkit", user: user.user });
      })
      .catch(({ message }) => this.setState({ error: message }));
    }catch({message}) {
      this.setState({ error: message });
    }
  }
  
  handleUpdateDrumkit(data){
    try{
      logic.updateUser(data)
        .then(user => {
          this.setState({ view: "drumkit", user: user.user });
        })
        .catch(({ message }) => this.setState({ error: message }));
    }catch({message}) {
      this.setState({ error: message });
    }
  }

  handleGoToDrumkit() {
    const {id, token} = this.state.credentials
    this.handleRetrieve(id,token)
    this.setState({ view: "drumkit", user: null, drumkit: null });
  }


  handleGoToJamtrack() {
    
    this.setState({ view: "jamtrack"});
  }  
  
  handleLogout() {
    delete sessionStorage.id;
    delete sessionStorage.token;

    this.setState({ credentials: undefined });
  }

  handleDrumkitEdit(kit) {
    console.log('kit from app :', kit);
    this.setState({ view: "drumkit", drumkit: kit });
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
      state: { view, credentials, error, user, drumkit },
      handleGoToRegister,
      handleRegister,
      handleBackToLanding,
      handleGoToLogin,
      handleLogin,
      handleLogout,
      handleGoToDrumkit,
      handleChange,
      handleRetrieve,
      handleUpdateDrumkit,
      handleDrumkitEdit,
      handleGoToJamtrack
      
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
            onEditDrumkit={handleDrumkitEdit}
            onJamtrack={handleGoToJamtrack}
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
          onRetrieve={handleRetrieve}
          user={user}
          onUpdate={handleUpdateDrumkit}
          drumkit={drumkit}
          />
        )}
          {view === "jamtrack" && (
          <Jamtrack
          
          />
        )}
  
      </>
    );
  }
}

export default App