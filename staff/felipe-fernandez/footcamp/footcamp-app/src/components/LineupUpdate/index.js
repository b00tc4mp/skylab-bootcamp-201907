import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import { withRouter} from 'react-router-dom'
import Header from '../Header'

function LineupUpdate({match ,history}) {

    const [lineupChanges, setLineupChanges] = useState()
    const [playerLineup, setPlayerLineup] = useState()
    const [idPlayerToChange, setIdPlayerToChange] = useState()

    useEffect(() => {
        (async () => {
            try {
                debugger
            const { params: { id }} = match
            const leagueId  = await logic.retrieveAllLeagues()
            
            const resultTeam  = await logic.retrieveLineup(leagueId, sessionStorage.team )
            sessionStorage.league = leagueId

            //get the player who I clicked before to get his position
            const playerRetrieved = await logic.retrievePlayer( id)
            
            //get the whole team
            const teamLeague = await logic.retrieveTeam( leagueId, sessionStorage.team)
            setLineupChanges(lineupChanges)

            //get all the players of the team 
            const res = await Promise.all(teamLeague.team.players.map((playerId) => 
                     logic.retrievePlayer( playerId)
                ))

            //filter all the team by the position of the player selected before
            const playerLineupByPosition = res.filter(res=> res.player.position ===playerRetrieved.player.position)
            //filter all the players of the same positio that they are not included in the starting lineup
            const playerLineup  = playerLineupByPosition.filter(res=> !resultTeam.teamLineup.includes(res.player.id) )
            
                
            setPlayerLineup(playerLineup)
        } catch ({ message }) {
                
            console.log('fail create team', message)
          }
            
        })()
    }, [])

    function handleBack(){
       
        history.push('/mylineup')
    }

    function handleLineup(playerIdToChange){
        (async () => {
            try {

                //get the id of the player selected and the player before and get an update
                const leagueId  = await logic.retrieveAllLeagues()
                const resultTeam  = await logic.retrieveLineup(leagueId, sessionStorage.team )
                const { params: { id }} = match
                const idIndex = resultTeam.teamLineup.findIndex(idteam=> idteam===id)
                
                await logic.updateTeam( leagueId, sessionStorage.team, idIndex.toString(),playerIdToChange )
                history.push('/mylineup')
                
            } catch ({ message }) {
                    
                console.log('fail create team', message)
            }
        })()
    }

    function addDefaultSrc(event) {
        
        event.target.src = 'http://localhost:8080/images/avatar.jpg'
        
    }
        
    return <div class="card"> 
   
        <Header />
            <ul>
                
                {playerLineup && playerLineup.map(playerlineup => 
                <li  key={playerlineup.player.id}
                   
                onClick={event => {
                    event.preventDefault()
                    const playerIdToChange =playerlineup.player.id
                    handleLineup(playerIdToChange)
                    
                }}> 
               
                     <figure class="image is-4by4">
                 <img onError={addDefaultSrc} src={"http://localhost:8080" + playerlineup.player.photo} width="300px"/>  
                    </figure>
                    <h3 class="title is-4">{playerlineup.player.name}</h3>
                    <p class="subtitle is-6">{playerlineup.player.surname}</p>        
                        
                </li>)}

            </ul>

            <a href="#" onClick={event => {
                    event.preventDefault()
                    handleBack()
                }}>Go back</a>
                
            </div>


}

export default withRouter(LineupUpdate)