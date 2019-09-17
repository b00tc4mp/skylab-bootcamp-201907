import React, { useState, useContext } from 'react'
import logic from '../../logic'
import { withRouter } from "react-router-dom"
import Context from '../Context'
import Feedback from '../Feedback'
import InitialHeader from '../InitialHeader'

function Login(props) {

  const { user, setUser } = useContext(Context)
  const [error , setError] = useState(undefined) 
  const [league , setLeague] = useState(undefined) 
  const { history } = props



  function handleLogin(email, password)  {

    return(async()=>{

        try {
          
          await logic.authenticateUser(email, password)
          
          //setting the user for further use
          const user = await logic.retrieveUser()
          setUser(user)
          sessionStorage.id= user.id
          
          //check if the user has leagues
          const leagueId = await logic.retrieveAllLeagues()
          if (leagueId) sessionStorage.league=leagueId
          !leagueId ? history.push('/create-leagues') : history.push('/myleague')

        } catch({message}) {
            setError(message)
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

    
  const handleBack = () => {
     
        history.push('/')
    }
  
    return (
        <div >
          <InitialHeader />
          <div className="login">
          <h2>LOGIN</h2>
            <form onSubmit={handleFormSubmit}>
             <div className="form__inputs"> 
                <input
                    
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleEmailInput}
                    
                />
            </div>
            <div className="form__inputs">
                <input
                    
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handlePasswordInput}
                    
                />
              </div>
                <button>Submit</button>
            </form>
            {error && <Feedback message={error}/>}
            <a href="#" onClick={event => {
            event.preventDefault()
            handleBack()
        }}><i className="fas fa-arrow-circle-left fa-2x"></i></a>
        </div>
        </div>
    )
}

export default withRouter(Login)
