import React, { useState, useContext } from 'react'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'
import Context from '../Context'
import Feedback from '../Feedback'

function CreateLeagues(props) {

    const { history } = props
    const { nameLeague, setNameLeague, leagueId, setLeagueId, existLeague, setExistLeague} = useContext(Context)
    const [name, setName] = useState(null)
    const [code, setCode] = useState(null)
    const [error , setError] = useState(undefined) 
      
    const handleNameInput = event => setName(event.target.value)
    const handleCodeInput = event => setCode(event.target.value)
    
    function handleCreate (name, code) {
       
        (async()=>{
            
            try {
               
                const {leagueId} = await logic.createLeague(name, code)
                // setNameLeague(name)
                // setCode(code)
                //set the id of the league to use after in the creation of teams
                if(leagueId) {
                setLeagueId(leagueId)               
                sessionStorage.league=leagueId
                }
              
                history.push('/create-teams')
                    
              
            } catch ({ message }) {
                
                setError("There has been an error creating the league")
            }
        })()
      }

      function handleJoin(code) {
       
        (async()=>{
            debugger
            try {
              
            const {leagueId} = await logic.joinLeague(code)
            setLeagueId(leagueId)
                
               
            // setCode(code)
          
                
                
            history.push('/create-teams')
                    
               
            } catch ({ message }) {
                
                setError("There has been an error joining the league")
            }
        })()
      }
    
    const handleFormSubmitCreate = event => {
        event.preventDefault()
        handleCreate(name, code)
    }

    const handleFormSubmitJoin = event => {
        event.preventDefault()
        handleJoin(code)
    }

    
    return (
        <div className="useState" >
            <h2>Create a league</h2>
            <form onSubmit={handleFormSubmitCreate}>
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
                    type="code"
                    name="code"
                    placeholder="Code"
                    onChange={handleCodeInput}
                    required
                />
                <button className="button is-fullwidth is-info is-outlined">Submit</button>
            </form>

            <h2>Join a league</h2>
            <form onSubmit={handleFormSubmitJoin}>
                {/* <input
                    className="input is-info"
                    type="name"
                    name="name"
                    placeholder="Name"
                    onChange={handleNameInput}
                    required
                /> */}
                <input
                    className="input is-info"
                    type="code"
                    name="code"
                    placeholder="Code"
                    onChange={handleCodeInput}
                    required
                />
                <button className="button is-fullwidth is-info is-outlined">Submit</button>
            </form>
            {error && <Feedback message={error}/>} 
        </div>
    )
}

export default withRouter(CreateLeagues)
