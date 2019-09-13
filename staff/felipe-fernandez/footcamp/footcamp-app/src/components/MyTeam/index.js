import React, { useState, useEffect, useContext } from 'react'
import logic from '../../logic'
import { withRouter} from 'react-router-dom'
import Context from '../Context'
import PlayerResult from '../PlayerResult'


function MyTeam (props) {
  
    const { teams, setTeams, leagueId, teamName, setTeamName, teamId, setTeamId, player, setPlayer } = useContext(Context)
    const { history} = props
    

    useEffect(() => {
        (async () => {
            const token = logic.userCredentials
            
            //const user  = await logic.retrieveUser(token)
            
            const leagueId  = await logic.retrieveAllLeagues(token)
            const result  = await logic.retrieveTeam(token, teamId, leagueId)
            //const result  = await logic.retrieveTeam(token, teamId, user.leagues[0])

            const teams  = result.team.players.map(results=> results)
           
            setTeams(teams)

            const res = await Promise.all(teams.map((playerId) => 
                     logic.retrievePlayer(token, playerId)
                ))
            const player  = res.map(res=> res.player)
                
            setPlayer(player)
                
            
        })()
    }, [])

    return <div>
            
            <ul>
                
            {player && player.map(teamplayer => <li  key={teamplayer.id}> <PlayerResult player={teamplayer}/> </li>)}
        </ul>
        </div>
}



export default withRouter(MyTeam)
