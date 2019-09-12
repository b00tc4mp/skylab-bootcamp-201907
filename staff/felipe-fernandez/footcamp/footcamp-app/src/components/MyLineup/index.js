import React, { useState, useEffect, useContext } from 'react'
import logic from '../../logic'
import { withRouter} from 'react-router-dom'
import Context from '../Context'
import PlayerResultLineup from '../PlayerResultLineup'


function MyLineup (props) {
  
    const { team, setTeam, lineup, setLineup, leagueId,  teamName, setTeamName, teamId, setTeamId, playerLineup, setPlayerLineup} = useContext(Context)
    const { history} = props
    

    useEffect(() => {
        (async () => {
            try {
                
            
            const token = logic.userCredentials

             const result  = await logic.retrieveTeam(token, teamId, leagueId)
            //const user  = await logic.retrieveUser(token)
            //const result  = await logic.retrieveTeam(token, teamId, user.leagues[0])

            // if (result.team.lineup)  resultTeam = await logic.getLineup
            
            const resultTeam  = await logic.retrieveLineup(token,teamId, leagueId)
            
            const lineup  = resultTeam.lineup.map(results=> results)
           
            setLineup(lineup)

            const res = await Promise.all(lineup.map((playerId) => 
                     logic.retrievePlayer(token, playerId)
                ))
            const playerLineup  = res.map(res=> res.player)
                
            setPlayerLineup(playerLineup)
        } catch ({ message }) {
                
            console.log('fail create team', message)
          }
            
        })()
    }, [])

    return <div>
                {/* <h2>{result.team.name_team}</h2> */}
            <ul>
                
            {playerLineup && playerLineup.map(playerlineup => <li  key={playerlineup.id}> <PlayerResultLineup playerLineup={playerlineup}/> </li>)}
        </ul>
        </div>
}



export default withRouter(MyLineup)
