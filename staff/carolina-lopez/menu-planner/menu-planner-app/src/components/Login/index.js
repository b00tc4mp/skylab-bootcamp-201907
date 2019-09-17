import React from 'react'
import { withRouter } from 'react-router-dom'

export default withRouter (function ({ history, onLogin }) {
  return <section className="body">
    <header>          
      <nav className="nav">
        <a className="nav__h2" href="index.html"><h2 className="nav__h2">MenuPlanner</h2></a>
      </nav>
    </header>
    <main className="main">
      <section className="form-section">
        <h3>Login</h3>
          <form className="form" onSubmit={event => {
            event.preventDefault()

            const { target: { email: { value: email }, password: { value: password } } } = event

            onLogin(email, password)
          }}>        
            <label>E-mail<input type="email" name="email"></input></label>
            <label>Password<input type="password" name="password"></input></label>
            <button className="main__button">Login</button>  
          </form>
        <a className="go-back" href="#" onClick={() => history.go(-1)}>Go back</a>
      </section>
    </main>
  </section>
})
