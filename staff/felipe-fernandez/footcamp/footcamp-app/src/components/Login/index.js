import React, { useState } from 'react'
import logic from '../../logic'
import { withRouter } from "react-router-dom";
 


function Login(props) {
  const { history } = props
  function handleLogin(email, password) 
  {
    (async()=>{

        try{
          await logic.authenticateUser(email, password)
          console.log('ok, you are logged')
          // navigate('/cards')
          history.push('/cards')
        } catch({message}) {
          console.log('fail login', message)
        }
    })()
 }

 const handleFormSubmit = event => {
   event.preventDefault()
   handleLogin(email, password)
}


    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const handleEmailInput = event => setEmail(event.target.value)

    const handlePasswordInput = event => setPassword(event.target.value)

  




    return (
        <div className="useState" >
            <form onSubmit={handleFormSubmit}>
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
             {/* <Route path="/search" render={() => <Results /> /> */}
        </div>
    )
}

export default withRouter(Login);
