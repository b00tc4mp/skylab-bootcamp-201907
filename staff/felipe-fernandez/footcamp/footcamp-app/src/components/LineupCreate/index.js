import React, { useState, useEffect, useContext } from 'react'
import logic from '../../logic'
import { withRouter} from 'react-router-dom'
import Context from '../Context'
import PlayerResultLineup from '../PlayerResultLineup'
import Header from '../Header'

function MyLineup (props) {
  
    const { team, setTeam,  leagueId, teamId, setTeamId} = useContext(Context)
    const [playerLineup, setPlayerLineup] = useState()
    const [lineup, setLineup] = useState()
    const { history} = props
    

    useEffect(() => {
        (async () => {
            try {
            
            const leagueId  = await logic.retrieveAllLeagues()
            debugger
            // const result  = await logic.retrieveTeam(leagueId,  sessionStorage.team)
    
            const resultTeam  = await logic.getLineup(sessionStorage.league, teamId)
            sessionStorage.league = leagueId
            
            const lineup  = resultTeam.lineup.map(results=> results)
           
            setLineup(lineup)

            const res = await Promise.all(lineup.map((playerId) => 
                     logic.retrievePlayer( playerId)
                ))
            const playerLineup  = res.map(res=> res.player)
                
            setPlayerLineup(playerLineup)
        } catch ({ message }) {
                
            console.log('fail create team', message)
          }
            
        })()
    }, [])

    return <div>
                <h2>THIS IS YOUR INITIAL LINEUP</h2>   
            <ul>
            
            {playerLineup && playerLineup.map(playerlineup => 
            <li  key={playerlineup.id}>
              
                <PlayerResultLineup playerLineup={playerlineup}/>
                     
             </li>)}
             <a href="#" onClick={event => {
                event.preventDefault()
                history.push('/myleague')
            }}>OK</a>
        </ul>
        </div>
}



export default withRouter(MyLineup)
