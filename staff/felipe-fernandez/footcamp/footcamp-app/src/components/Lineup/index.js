import React, { useState, useEffect, useContext } from 'react'
import logic from '../../logic'
import { withRouter} from 'react-router-dom'
import Context from '../Context'
import PlayerResult from '../PlayerResult'


function MyTeam (props) {
  
    const { team, setTeam, teamName, setTeamName, teamId, setTeamId, player, setPlayer } = useContext(Context)
    const { history} = props
    

    useEffect(() => {
        (async () => {
            const token = logic.userCredentials
            
            const result  = await logic.retrieveLineup(token, teamId)
            debugger
            const team  = result.lineup.map(results=> results)
           
            setTeam(team)

            const res = await Promise.all(team.map((playerId) => 
                     logic.retrievePlayer(token, playerId)
                ))
            const player  = res.map(res=> res.player)
                
            setPlayer(player)
                
            
        })()
    }, [])

    return <div>
                {/* <h2>{result.team.name_team}</h2> */}
            <ul>
                
            {player && player.map(teamplayer => <li  key={teamplayer.id}> <PlayerResult player={teamplayer}/> </li>)}
        </ul>
        </div>
}



export default withRouter(MyTeam)
