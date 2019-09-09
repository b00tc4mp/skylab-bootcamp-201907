import React, { Component } from 'react'
import './index.sass'




export default class extends Component {
  
  state = {}

  handleBack = () => console.log('going back...')

  render() {
    
    return <div className="App">
      {/* <Register onBack={handleBack} onRegister={handleRegister} />
      <Login onBack={handleBack} onLogin={handleLogin} /> */}
    </div>
  }
}
