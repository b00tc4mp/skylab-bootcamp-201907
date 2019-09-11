import React, { useState, useEffect, useContext } from 'react'
import logic from '../../logic'
import { withRouter} from 'react-router-dom'
import Context from '../Context'



function MyLeagues (props) {
    const [table, setTable] = useState(null)
    const { team, setTeam, leagueId, teamName, setTeamName, teamId, setTeamId, player, setPlayer } = useContext(Context)
    const { history} = props
    

    useEffect(() => {
        (async () => {
            debugger
            const token = logic.userCredentials
            const result  = await logic.retrieveTable(token, leagueId)
            
            const table  = result.teams.map(results=> results)
            setTable(table)

            // const names  = result.leagues.map(results=> results.name)
            // setNames(names)
            // const points  = result.leagues.map(results=> results.points)
            // setPoints(points)
           
                 
        })()
    }, [])

    return <div>
                <h2>MY TABLE</h2>
              
            <ul>
                 {table && table.map(tables => <li  key={tables.id}> 
                 <h3>{tables.name}</h3>
                 <h3> {tables.points}
                 </h3>
                  </li>)}
            </ul>
            
        </div>
}


export default withRouter(MyLeagues)


