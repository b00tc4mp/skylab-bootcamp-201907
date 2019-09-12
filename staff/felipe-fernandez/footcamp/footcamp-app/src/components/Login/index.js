import React, { useState, useContext } from 'react'
import logic from '../../logic'
import { withRouter } from "react-router-dom";
import Context from '../Context'

function Login(props) {

  const { user, setUser, existLeague, setExistLeague } = useContext(Context)
  const { history } = props



  function handleLogin(email, password)  {

    return(async()=>{

        try{
          debugger
          const {token} = await logic.authenticateUser(email, password)
          logic.userCredentials = token 

          const user = await logic.retrieveUser(token)

          setUser(user)
          //check if the user has leagues
          debugger
          const leagueId = await logic.retrieveAllLeagues(token)
        //   const leaguesId = existLeague.leagues.map(results=> results.id)
          // const leaguesRetrieved = await logic.retrieveLeague(token, leaguesId[0])

          // !(leagues.league.participants.includes(id))  || existLeague.leagues.length === 0 ? history.push('/create-leagues') : history.push('/myleagues')
          !leagueId ? history.push('/create-leagues') : history.push('/myleagues')
          

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
           
        </div>
    )
}

export default withRouter(Login)
