import React, { useState, useContext } from 'react'
import logic from '../../logic'
import PlayerResultInitial from '../PlayerResultInitial'
import { withRouter } from 'react-router-dom'
import Context from '../Context'
import Feedback from '../Feedback'
import InitialHeader from '../InitialHeader'

function CreateTeam(props) {

    const { history } = props
    
    const { name, setName,  leagueId, teamId, setTeamId } = useContext(Context)
    const [error , setError] = useState(undefined) 
    const [player , setPlayer] = useState(undefined) 
    

    const handleNameInput = event => setName(event.target.value)
    
    function handleCreateTeam( name) {


        (async()=>{
            
            try {
                debugger
                //call to logic and recveive 18 players and the id of the team
                const result  = await logic.createTeam(name, sessionStorage.league)
                const players  = result.players.players.map(results=> results)
                const teamId = result.players.id
                setTeamId(teamId) 
                
                
                const res = await Promise.all(players.map((playerId) => 
                     logic.retrievePlayer(playerId)
                ))
                const player  = res.map(res=> res.player)
                
                setPlayer(player)
               
                 
            } catch ({ message }) {
                
                setError(message)
            }
        })()
      }
    
    const handleFormSubmit = event => {
        event.preventDefault()
        handleCreateTeam(name)
    }

   

    return (
    
    <div>
        <section className="create-teams">
            <InitialHeader />

                <h2 className="create-teams__title">Create a team</h2>
                <form className="create-teams__form" onSubmit={handleFormSubmit}>
                    <div class="create-teams__form__inputs">
                        <input
                            type="name"
                            name="name"
                            placeholder="name"
                            onChange={handleNameInput}
                            required
                        />
                    </div>
                </form>
                {error && <Feedback message={error}/>}
                {player && player.map(oneplayer => 
                    <li className="players-create" key={oneplayer.id}> 
                    
                        <PlayerResultInitial player={oneplayer} />
                </li>)}
                {player && <a href="#" onClick={event => {
                    event.preventDefault()
                    
                    history.push('/create-lineup')
                }}>OK</a>}
            

         </section>
                
           
    </div>
    )
}

export default withRouter(CreateTeam)