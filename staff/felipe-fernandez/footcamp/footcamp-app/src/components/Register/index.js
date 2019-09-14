import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import { withRouter} from 'react-router-dom'
import Feedback from '../Feedback'

function Register(props) {
    const { history } = props
    const [error , setError] = useState(undefined) 

    function handleRegister (name, surname, email, password) {

        (async()=>{
            
            try {
               await logic.registerUser(name, surname, email, password)
               history.push('/register-success')
            
            } catch ({ message }) {
                setError("There has been an error in the process of register")
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
            <div class="form-inputs">
                <input
                    className="input is-info"
                    type="name"
                    name="name"
                    placeholder="Name"
                    onChange={handleNameInput}
                    
                />
            </div>
            <div class="form-inputs">
                <input
                    className="input is-info"
                    type="surname"
                    name="surname"
                    placeholder="Surname"
                    onChange={handleSurnameInput}
                    
                />
            </div>
            <div class="form-inputs">
                <input
                    className="input is-info"
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleEmailInput}
                    
                />
            </div>
                <input
                    className="input is-info"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handlePasswordInput}
                    
                />
                <button className="button is-fullwidth is-info is-outlined">Submit</button>
            </form>
            {error && <Feedback message={error}/>}
            <a href="#" onClick={event => {
            event.preventDefault()
            handleBack()
        }}>Go back</a>
            
        </div>
    )
}

export default withRouter(Register)
