import React, { useState, useEffect,useContext } from 'react'
import logic from '../../logic'
import PlayerResult from '../PlayerResult'
import { withRouter } from 'react-router-dom'
import Context from '../Context'
import Feedback from '../Feedback'
import InitialHeader from '../InitialHeader'

function CreateTeam(props) {

    const { history } = props
    
    const { name, setName, teamName, setTeamName, leagueId, setLeagueId, teamId, setTeamId,  existTeam, setExistTeam } = useContext(Context)
    const [error , setError] = useState(undefined) 
    const [player , setPlayer] = useState(undefined) 
    

    const handleNameInput = event => setName(event.target.value)
    
    function handleCreateTeam( name) {


        (async()=>{
            
            try {
                
                //call to logic and recveive 18 players and the id of the team
                const result  = await logic.createTeam(name, leagueId)
                const players  = result.players.players.map(results=> results)
                const teamId = result.players.id
                setTeamId(teamId) 
                setTeamName(name)
                
                const res = await Promise.all(players.map((playerId) => 
                     logic.retrievePlayer(playerId)
                ))
                const player  = res.map(res=> res.player)
                
                setPlayer(player)
               
                 
            } catch ({ message }) {
                
                setError("There has been an error creating the league")
            }
        })()
      }
    
    const handleFormSubmit = event => {
        event.preventDefault()
        handleCreateTeam( name)
    }

   

    return (
    
    <div className="useState" >
        <InitialHeader />

            <h2>Create a team</h2>
            <form onSubmit={handleFormSubmit}>
               
                <input
                    className="input is-info"
                    type="name"
                    name="name"
                    placeholder="name"
                    onChange={handleNameInput}
                    required
                />
                {/* <button  className="button is-fullwidth is-info is-outlined">Submit</button> */}
            </form>
            {error && <Feedback message={error}/>}
            {player && player.map(oneplayer => <li className ="players-create" key={oneplayer.id}> <PlayerResult player={oneplayer} /> </li>)}
            {player && <a href="#" onClick={event => {
                event.preventDefault()
                
                history.push('/create-lineup')
            }}>OK</a>}
         


                
           
    </div>
    )
}

export default withRouter(CreateTeam)