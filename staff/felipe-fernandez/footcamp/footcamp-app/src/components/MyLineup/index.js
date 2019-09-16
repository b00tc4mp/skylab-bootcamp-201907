import React, { useState, useEffect, useContext } from 'react'
import logic from '../../logic'
import { withRouter} from 'react-router-dom'
import Context from '../Context'
import PlayerResult from '../PlayerResult'
import Header from '../Header'

function MyLineup (props) {
  
    const { team, setTeam,  leagueId, teamId, setTeamId} = useContext(Context)
    // const [playerLineup, setPlayerLineup] = useState()
    const [lineup, setLineup] = useState()
    const [player, setPlayer] = useState()
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
            // const playerLineup  = res.map(res=> res.player)
                
            // setPlayerLineup(playerLineup)

            const player  = res.map(res=> res.player)
                
            setPlayer(player)

        } catch ({ message }) {
                
            
          }
            
        })()
    }, [])

    return <div>
            <Header />
            <h2>MY LINEUP</h2>
             <div>     
                <ul className="container">
                {/* className={`item item${i}`}  */}
                {player && player.map((playerlineup, i)  => 
                <li key={playerlineup.id}>
                     <a className="item-players" href={`/#/lineup/${playerlineup.id}`}> 
                        <PlayerResult player={playerlineup}/>
                       
                        
                        </a>   
                     </li>)}
             </ul>
            </div>
        </div>
}



export default withRouter(MyLineup)
