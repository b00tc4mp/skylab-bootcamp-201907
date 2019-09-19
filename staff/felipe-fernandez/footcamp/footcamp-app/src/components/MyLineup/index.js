import React, { useState, useEffect, useContext } from 'react'
import logic from '../../logic'
import { withRouter} from 'react-router-dom'
import PlayerResult from '../PlayerResult'
import Header from '../Header'

function MyLineup (props) {
  
   
    const [lineup, setLineup] = useState()
    const [player, setPlayer] = useState()
    const [error , setError] = useState(undefined) 
    const { history} = props
    

    useEffect(() => {
        (async () => {
            try {
            
            const leagueId  = await logic.retrieveAllLeagues()
         
            const resultTeam  = await logic.retrieveLineup(leagueId, sessionStorage.team )
            sessionStorage.league = leagueId

            const lineup  = resultTeam.teamLineup.map(results=> results)
           
            setLineup(lineup)

            const res = await Promise.all(lineup.map((playerId) => 
                     logic.retrievePlayer( playerId)
                ))
            
            const player  = res.map(res=> res.player)
                
            setPlayer(player)

        } catch ({ message }) {
                
            setError(message)
          }
            
        })()
    }, [])

    return <div>
            <section className="mylineup">
            <Header />
            <h2>MY LINEUP</h2>
             <div>     
                <ul>
             
                {player && player.map((playerlineup, i)  => 
                <li key={playerlineup.id}>
                     <a className="item-players" href={`/#/lineup/${playerlineup.id}`}> 
                        <PlayerResult player={playerlineup}/>
                       
                        
                        </a>   
                     </li>)}
             </ul>
            </div>
            </section>
        </div>
}



export default withRouter(MyLineup)
