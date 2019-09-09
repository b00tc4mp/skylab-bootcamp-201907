import React, { useState } from 'react'
import logic from '../../logic'


function Register() {

    function handleRegister (name, surname, email, password) {

        (async()=>{
            
            try {
               logic.registerUser(name, surname, email, password)
        
              console.log('ok, registered... TODO show succeed register panel')
            } catch ({ message }) {
              console.log('fail register', message)
            }
        })()
      }
    
    
    const handleFormSubmit = event => {
        event.preventDefault()
        handleRegister(name, surname, email, password)
    }


        const [name, setName] = useState(null)
        const [surname, setSurname] = useState(null)
        const [email, setEmail] = useState(null)
        const [password, setPassword] = useState(null)
  

    const handleNameInput = event => setName(event.target.value)
    const handleSurnameInput = event => setSurname(event.target.value)

    const handleEmailInput = event => setEmail(event.target.value)

    const handlePasswordInput = event => setPassword(event.target.value)
    
    return (
        <div className="useState" >
            <form onSubmit={handleFormSubmit}>
                <input
                    className="input is-info"
                    type="name"
                    name="name"
                    placeholder="Name"
                    onChange={handleNameInput}
                    required
                />
                <input
                    className="input is-info"
                    type="surname"
                    name="surname"
                    placeholder="Surname"
                    onChange={handleSurnameInput}
                    required
                />
                <input
                    className="input is-info"
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleEmailInput}
                    required
                />
                <input
                    className="input is-info"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handlePasswordInput}
                    required
                />
                <button className="button is-fullwidth is-info is-outlined">Submit</button>
            </form>
        </div>
    )
}

export default Register
