import React, { Component } from 'react'
import './index.sass'
import Register from '../Register'
import logic from '../../logic'

export default class extends Component {
  // constructor() {
  //   super()
  //   this.state = {}
  // this.handleRegister = this.handleRegister.bind(this)
  // }
  state = {}

  handleBack = () => console.log('going back...')

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

  render() {
    const { handleBack, handleRegister } = this

    return <div className="App">
      <Register onBack={handleBack} onRegister={handleRegister} />
    </div>
  }
}
