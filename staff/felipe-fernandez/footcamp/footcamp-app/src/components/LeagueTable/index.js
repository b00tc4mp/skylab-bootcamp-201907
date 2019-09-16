import React, { useState, useEffect, useContext } from 'react'
import logic from '../../logic'
import { withRouter} from 'react-router-dom'
import Context from '../Context'
import Header from '../Header'


function MyLeagues (props) {
    const [table, setTable] = useState(null)
    const [points, setPoints] = useState(null)
    const { team, setTeam, leagueId, teamName, setTeamName, teamId, setTeamId, player, setPlayer } = useContext(Context)
    const { history} = props
    

    useEffect(() => {
        (async () => {
            try {
                debugger
            const leagueId  = await logic.retrieveAllLeagues()
            const result  = await logic.retrieveTable(leagueId)
            sessionStorage.league = leagueId
            const tableSorted  = result.teams.map(results=> results)
            const table = tableSorted.sort((a, b) => (b.totalPoints - a.totalPoints))
            setTable(table)                

      
 
           } catch({message}) {
          console.log( message)
        }
                 
        })()
    }, [])

    

    return <div>
           <Header />
                <h2>MY TABLE</h2>
              
            <ul className="clasification">
                 {table && table.map((tables ,i) => <li className="clasification__list" key={tables.id}> 
                <a className="clasification__table" href={`/#/team/${tables.id}`}>
                <p className="clasification__list__team">{tables.name}</p>
                <p className="clasification__list__points">{tables.totalPoints} </p>
                          
                
                 </a>
                </li>)}
            </ul>
            
        </div>
}


export default withRouter(MyLeagues)


