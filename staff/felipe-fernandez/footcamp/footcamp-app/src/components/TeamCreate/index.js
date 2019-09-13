import React, { useState, useEffect,useContext } from 'react'
import logic from '../../logic'
import PlayerResult from '../PlayerResult'
import { withRouter } from 'react-router-dom'
import Context from '../Context'

function CreateTeam(props) {

    const { history } = props
    
    const { name, setName, teamName, setTeamName, leagueId, setLeagueId, teamId, setTeamId, player, setPlayer, existTeam, setExistTeam } = useContext(Context)

    const handleNameInput = event => setName(event.target.value)
    
    function handleCreateTeam( name) {


        (async()=>{
            
            try {
                
                const token = logic.userCredentials
                //call to logic and recveive 18 players and the id of the team
                debugger
                const result  = await logic.createTeam(name, token, leagueId)
                const players  = result.players.players.map(results=> results)
                const teamId = result.players.id
                setTeamId(teamId) 
                setTeamName(name)
                
                const res = await Promise.all(players.map((playerId) => 
                     logic.retrievePlayer(token, playerId)
                ))
                const player  = res.map(res=> res.player)
                
                setPlayer(player)
                
                                   
                console.log('ok, league created right')

            } catch ({ message }) {
                
              console.log('fail create team', message)
            }
        })()
      }
    
    const handleFormSubmit = event => {
        event.preventDefault()
        handleCreateTeam( name)
    }


    return (
    
    <div className="useState" >
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
                <button className="button is-fullwidth is-info is-outlined">Submit</button>
            </form>
            {player && player.map(oneplayer => <li  key={oneplayer.id}> <PlayerResult player={oneplayer} /> </li>)}
            <a href="#" onClick={event => {
                event.preventDefault()
                history.push('/home-landing')
            }}>OK</a>
         


                
           
    </div>
    )
}

export default withRouter(CreateTeam)