import React, { useState, useEffect, useContext } from 'react'
import logic from '../../logic'
import { withRouter} from 'react-router-dom'
import Context from '../Context'
import PlayerResult from '../PlayerResult'
import Header from '../Header'


function MyTeam (props) {
  
    const { teams, setTeams,  } = useContext(Context)
    const [player, setPlayer] = useState()
    
       

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
            <section className="myteam">
            <Header />
            <h2>MY TEAM</h2>
               
             <ul>

                 {player && player.map(teamplayer => <li 
            
                 key={teamplayer.id}>
                <a className ="players" href={`/#/player/${teamplayer.id}`}>
                 
                 <PlayerResult player={teamplayer}/> 
                 
                 </a>
                 </li>)}
            </ul>
            </section>
        </div>
}



export default withRouter(MyTeam)
