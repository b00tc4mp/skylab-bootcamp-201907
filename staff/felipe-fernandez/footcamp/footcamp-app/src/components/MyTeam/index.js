import React, { useState, useEffect, useContext } from 'react'
import logic from '../../logic'
import { withRouter} from 'react-router-dom'
import Context from '../Context'
import PlayerResult from '../PlayerResult'
import Header from '../Header'


function MyTeam (props) {
  
    const { teams, setTeams, leagueId, teamId, setTeamId } = useContext(Context)
    const [player, setPlayer] = useState()
    const { history} = props
    

    useEffect(() => {
        (async () => {
                        
            const leagueId  = await logic.retrieveAllLeagues()
            const result  = await logic.retrieveTeam(leagueId, sessionStorage.team)
            
            const teams  = result.team.players.map(results=> results)
           
            setTeams(teams)

            const res = await Promise.all(teams.map((playerId) => 
                     logic.retrievePlayer( playerId)
                ))
            const player  = res.map(res=> res.player)
                
            setPlayer(player)
                
            
        })()
    }, [])

   


    return <div>
            <Header />

             <ul>

                 {player && player.map(teamplayer => <li 
            
                 key={teamplayer.id}>
                <a href={`/#/player/${teamplayer.id}`}>
                 
                 <PlayerResult player={teamplayer}/> 
                 
                 </a>
                 </li>)}
          </ul>
        </div>
}



export default withRouter(MyTeam)
