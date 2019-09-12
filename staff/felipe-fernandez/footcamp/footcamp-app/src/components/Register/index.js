import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import { withRouter} from 'react-router-dom'

function Register(props) {
    const { history } = props
    
    function handleRegister (name, surname, email, password) {

        (async()=>{
            
            try {
               await logic.registerUser(name, surname, email, password)
               history.push('/register-success')
            
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


    const handleBack = () => {
        
            history.push('/')
      }


    
    return (
        <div className="useState" >
            <h2>REGISTER</h2>
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
            <a href="#" onClick={event => {
            event.preventDefault()
            handleBack()
        }}>Go back</a>
            
        </div>
    )
}

export default withRouter(Register)
