import React, { useState, useEffect, useContext } from 'react'
import logic from '../../logic'
import { withRouter} from 'react-router-dom'
import Context from '../Context'
import Header from '../Header'


function MyLeagues (props) {
    const [table, setTable] = useState(null)
    const { team, setTeam, leagueId, teamName, setTeamName, teamId, setTeamId, player, setPlayer } = useContext(Context)
    const { history} = props
    

    useEffect(() => {
        (async () => {
            try {
                
            const leagueId  = await logic.retrieveAllLeagues()
            const result  = await logic.retrieveTable(leagueId)
            sessionStorage.league = leagueId
            const table  = result.teams.map(results=> results)
            setTable(table)
            
            // const teamLeague = await logic.retrieveTeam( leagueId, table.id)
           

            // const res = await Promise.all(teamLeague.team.players.map((playerId) => 
            //          logic.retrievePlayer( playerId)
            //     ))
            // const player  = res.map(res=> res.player)
                
            // setPlayer(player)

           
           } catch({message}) {
          console.log('fail login', message)
        }
                 
        })()
    }, [])

    return <div>
           <Header />
                <h2>MY TABLE</h2>
              
            <ul>
                 {table && table.map(tables => <li  key={tables.id}> 
                <a href={`/#/team/${tables.id}`}>
                 <h3>{tables.name}</h3>
                 <h3> {tables.points} </h3>
                 
                
                 </a>
                  </li>)}
            </ul>
            
        </div>
}


export default withRouter(MyLeagues)


