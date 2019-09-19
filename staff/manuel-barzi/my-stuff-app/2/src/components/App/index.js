import React, { Component } from 'react'
import './index.sass'
import Register from '../Register'
import Login from '../Login'
import logic from '../../logic'
import { Route, Link, withRouter } from 'react-router-dom'

export default withRouter(class extends Component {
  // constructor() {
  //   super()
  //   this.state = {}
  // this.handleRegister = this.handleRegister.bind(this)
  // }
  state = { view: undefined }

  handleBack = () => {
    const { props: { history } } = this

    this.setState({ view: undefined}, () => history.push('/'))
  }

  // handleRegister() { 
  //   this.setState({ hola: 'mundo' }) 
  // }
  handleRegister = async (name, surname, email, password) => {
    try {
      await logic.registerUser(name, surname, email, password)

      console.log('ok, registered... TODO show succeed register panel')
    } catch ({ message }) {
      console.log('fail register', message)
    }
  }

  handleLogin = async (email, password) => {
    try {
      const token = await logic.authenticateUser(email, password)

      console.log('ok, authenticated', token)
    } catch ({ message }) {
      console.log('fail login', message)
    }
  }

  handleGoToRegister = event => {
    event.preventDefault()

    const { props: { history } } = this

    this.setState({ view: 'register' }, () => history.push('/register'))
  }

  handleGoToLogin = event => {
    event.preventDefault()

    const { props: { history } } = this

    this.setState({ view: 'login' }, () => history.push('/login'))
  }

  componentWillReceiveProps() {
    const { props: { history } } = this

    if (history.location.pathname === '/') this.setState({ view: undefined })
  }

  render() {
    const { handleBack, handleRegister, handleLogin, handleGoToLogin, handleGoToRegister, state: { view } } = this

    return <div className="App">
      {/* <header>
        <nav>
          <ul>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>
      </header> */}

      <header>
        <nav>
          <ul>
            {view !== 'register' && <li><a href="" onClick={handleGoToRegister}>Register</a></li>}
            {view !== 'login' && <li><a href="" onClick={handleGoToLogin}>Login</a></li>}
          </ul>
        </nav>
      </header>

      <Route path="/register" render={() => <Register onBack={handleBack} onRegister={handleRegister} />} />
      <Route path="/login" render={() => <Login onBack={handleBack} onLogin={handleLogin} />} />
    </div>
  }
})
