import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import { withRouter} from 'react-router-dom'
import Header from '../Header'
import PlayerResult from '../PlayerResult'

 function TeamsLeague ({ match, history }) {
    const [teamLeague, setTeamLeague] = useState()
    const [player, setPlayer] = useState()
    const [error , setError] = useState(undefined) 

    useEffect(() => {
        (async () => {
            try {
                
            const { params: { id }} = match
            const leagueId  = await logic.retrieveAllLeagues()
            
            const teamLeague = await logic.retrieveTeam( leagueId, id)

            setTeamLeague(teamLeague)


            const res = await Promise.all(teamLeague.team.players.map((playerId) => 
                     logic.retrievePlayer( playerId)
                ))
            const player  = res.map(res=> res.player)
                
            setPlayer(player)

        } catch({message}) {
            setError(message)
          }
        })()
    }, [])
      
  const handleBack = () => {
     
    history.go(-1)
}

    return <div>
        <Header />
          
        <ul>

            {player && player.map(teamplayer => <li 
            
           
            key={teamplayer.id}>
                <a className ="players"  href={`/#/player/${teamplayer.id}`}>
                 
                 <PlayerResult player={teamplayer}/> 
                 
                 </a>
                 </li>)}
        </ul>
            <a href="#" onClick={event => {
            event.preventDefault()
            handleBack()
        }}>Go back</a>
       
    </div>
}

export default withRouter(TeamsLeague)
