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
            try {

            debugger
            const token = logic.userCredentials
            const result  = await logic.retrieveTable(token, leagueId)
            // const user  = await logic.retrieveUser(token)
            // const result  = await logic.retrieveTeam(token,  user.leagues[0])
            const table  = result.teams.map(results=> results)
            setTable(table)

           
           } catch({message}) {
          console.log('fail login', message)
        }
                 
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


