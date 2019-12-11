import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import { withRouter} from 'react-router-dom'
import Header from '../Header'

function LineupUpdate({match ,history}) {

    const [lineupChanges, setLineupChanges] = useState()
    const [playerLineup, setPlayerLineup] = useState()
    const [error , setError] = useState(undefined) 
  

    useEffect(() => {
        (async () => {
            try {
                
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
                
            setError(message)
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


    function positionPlayer(number){
        switch(number){
            case 1: 
            return 'Goalkeeper'
            break;
            case 2:
            return 'Defender'
            break;
            case 2:
            return 'Midfielder'
            break;
            case 2:
            return 'Striker'
            break;
        }
    }
        
    return <div> 
            <section className="lineupdate">
                <Header />
                <ul>
                    <h2>AVAILABLE PLAYERS</h2>
                    {playerLineup && playerLineup.map(playerlineup => 
                    <li  key={playerlineup.player.id}
                    
                    onClick={event => {
                        event.preventDefault()
                        const playerIdToChange =playerlineup.player.id
                        handleLineup(playerIdToChange)
                        
                    }}> 
                
                        <div className="player-lineup">
                        <img className="player-lineup__image" onError={addDefaultSrc} src={"http://localhost:8080" + playerlineup.player.photo} width="300px"/>
                        <div className="player-lineup__content">
                            <p className="player-lineup__content__name">{playerlineup.player.name} {playerlineup.player.surname}</p>
                            <p className="player-lineup__content__position">{positionPlayer(playerlineup.player.position)}</p>
                            <p className="player-lineup__content__points">Total points: {playerlineup.player.totalPoints}</p>
                        </div>
                </div>
                    </li>)}

                </ul>

                <a href="#" onClick={event => {
                        event.preventDefault()
                        handleBack()
                    }}><i class="fas fa-arrow-circle-left fa-2x"></i></a>
                    
             </section>   
            </div>


}

export default withRouter(LineupUpdate)