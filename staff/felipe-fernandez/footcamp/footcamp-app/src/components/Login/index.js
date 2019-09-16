import React, { useState, useContext } from 'react'
import logic from '../../logic'
import { withRouter } from "react-router-dom"
import Context from '../Context'
import Feedback from '../Feedback'
import InitialHeader from '../InitialHeader'

function Login(props) {

  const { user, setUser, existLeague, setExistLeague } = useContext(Context)
  const [error , setError] = useState(undefined) 
  const { history } = props



  function handleLogin(email, password)  {

    return(async()=>{

        try {
          
          await logic.authenticateUser(email, password)
          // logic.userCredentials = token 
          
          //setting the user for further use
          const user = await logic.retrieveUser()
          setUser(user)
          sessionStorage.id= user.id
          

          //check if the user has leagues
          
          const leagueId = await logic.retrieveAllLeagues()
          if (leagueId) sessionStorage.league=leagueId
        //   const leaguesId = existLeague.leagues.map(results=> results.id)
          // const leaguesRetrieved = await logic.retrieveLeague(token, leaguesId[0])

          // !(leagues.league.participants.includes(id))  || existLeague.leagues.length === 0 ? history.push('/create-leagues') : history.push('/myleagues')
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
        <div  >
          <InitialHeader />

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
                <button className="">Submit</button>
            </form>
            {error && <Feedback message={error}/>}
            <a href="#" onClick={event => {
            event.preventDefault()
            handleBack()
        }}>Go back</a>
        </div>
    )
}

export default withRouter(Login)
