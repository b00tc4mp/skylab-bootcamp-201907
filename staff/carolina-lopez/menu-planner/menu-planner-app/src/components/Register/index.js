import React from 'react'
import { withRouter } from 'react-router-dom'
import {Feedback} from '../../components'

export default withRouter (function ({ history , onRegister, error }) {
  return <section className="body">
    <header className="navbar">
      <div className="dropdown dropdown-left">
        <button className="dropbtn-sh">MenuPlanner 
        </button>
      </div> 
    </header>
    <main className="main">
      <section className="form-section">
        <h3>Register</h3>
          <form className="form" onSubmit={event => {
            event.preventDefault()

            const { target: { name: { value: name}, surname: { value: surname}, email: { value: email }, password: { value: password } } } = event

            onRegister(name, surname, email, password)
          }}>
            <label>Name<input type="text" name="name"></input></label>
            <label>Surname<input type="text" name="surname"></input></label>        
            <label>E-mail<input type="email" name="email"></input></label>
            <label>Password<input type="password" name="password"></input></label>
            <button className="main__button">Register</button>  
          </form>
        <a className="go-back" href="#" onClick={() => history.go(-1) }>Go back</a>
      </section>
      {error && <Feedback message={error} />}
    </main>
  </section>
})