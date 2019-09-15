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
            
            // const result  = await logic.retrieveTeam(leagueId,  sessionStorage.team)
    
            const resultTeam  = await logic.retrieveLineup(leagueId, sessionStorage.team )
            sessionStorage.league = leagueId

            const lineup  = resultTeam.teamLineup.map(results=> results)
           
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
            <Header />
             <div>     
                <ul className="container">
                
                {playerLineup && playerLineup.map((playerlineup, i)  => 
                <li className={`item item${i}`} key={playerlineup.id}>
                    <a href={`/#/lineup/${playerlineup.id}`}> 
                        <PlayerResultLineup playerLineup={playerlineup}/>
                        </a>  
                     </li>)}
             </ul>
            </div>
        </div>
}



export default withRouter(MyLineup)
