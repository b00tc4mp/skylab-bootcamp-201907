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
                debugger
            const leagueId  = await logic.retrieveAllLeagues()
            const result  = await logic.retrieveTable(leagueId)
            sessionStorage.league = leagueId
            const table  = result.teams.map(results=> results)
            //setTable(table)
            
            //intento de puntos. sale puntos de un equipo
            // const teams = table.map(element => element.id)             
            
            // const lineup = await Promise.all(teams.map((team) => 
            //       logic.retrieveLineup(leagueId, sessionStorage.team)
            // ))
            
            // let players = []
            // let players2 = []

            // lineup.forEach(element => {
            //    players =  element.teamLineup

            // })

            

            // const players= await Promise.all(teamLineup.map((lin) => 
            //     logic.retrieveLineup(leagueId, sessionStorage.team)
            //  ))

            debugger
            const teams = table.map(element => element.id)  
              
            let points = []

            teams.forEach(async(element) => {

                const resultTeam  = await logic.retrieveLineup(leagueId, element)
            
                 let lineup  = resultTeam.teamLineup.map(results=> results)
           
                // setLineup(lineup)

                 let res = await Promise.all(lineup.map((player) => 
                     logic.retrievePlayer(player)
                ))

                points.push(res.map(res=> res.player.totalPoints))

            })

            // const resultTeam  = await logic.retrieveLineup(leagueId, sessionStorage.team)
            
            // const lineup  = resultTeam.teamLineup.map(results=> results)
           
            // setLineup(lineup)

            // const res = await Promise.all(lineup.map((playerId) => 
            //          logic.retrievePlayer( playerId)
            //     ))
            // const points  = res.map(res=> res.player.totalPoints)

                
 
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


