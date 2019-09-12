import React, { useState, useEffect, useContext } from 'react'
import logic from '../../logic'
import { withRouter} from 'react-router-dom'
import Context from '../Context'



function MyLeagues (props) {
    const [leagues, setLeagues] = useState(null)
    const [points, setPoints] = useState(null)
    const { team, setTeam, teamName, setTeamName, teamId, setTeamId, player, setPlayer, leagueId, setLeagueId } = useContext(Context)
    const { history} = props
    

    useEffect(() => {
        (async () => {
            debugger
            const token = logic.userCredentials
            const result  = await logic.retrieveAllLeagues(token)
            
         
            // const leagues = result.leagues.map(results=> results)
            // setLeagues(leagues)
            const leagueId = result.leagues.map(results=> results.id)
            setLeagueId(leagueId[0])
            const leagues2 = result.leagues.map(results=> results.id)
            // setLeagues(leagues)

            const {league :leagues} = await logic.retrieveLeague(token, leagueId)

            //let leagues = Object.values(leagues3)
            setLeagues(leagues)

        })()
    }, [])

    // function goToLeagues(){
         
    //     (async () => {
    //         // setLeagueId(league.id)
    //         const token = logic.userCredentials
    //         const result  = await logic.retrieveLeague(token, leagueId)
    //         teamId =  result.team
    //         setTeamId(teamId)
    //         history.push('/home-landing')
            
    //     })()
         
    // }

//     return <div>
//                 <h2>MY LEAGUES</h2>
//              <ul> 
//                   {leagues && leagues.map(league => <li  key={league.id}>  
//                 <h3> {league.name} </h3>
//                 <h3> {league.points}</h3>
                
//                 <a href="" onClick={event => {
//                     event.preventDefault()
//                     // goToLeagues(league.id)
//                     // setTeamId(league.team[0])
//                     setLeagueId(leagueId)
//                     history.push('/home-landing')
//                 }}>Go league</a>
                           
//                  </li>)}
//              </ul> 
            
//         </div>
// }

    return <div>
                
             
                {leagues && 
                <>
                <h2>MY LEAGUES</h2>
            
                 <h3> {leagues.name} </h3>
                 {/* <h3> {leagues.points}</h3> */}
                 <h3> {leagues.team}</h3>
                
                <a href="" onClick={event => {
                    event.preventDefault()
                    // goToLeagues(league.id)
                    setTeamId(leagues.teams[0]._id)
                    setLeagueId(leagueId)
                    history.push('/home-landing')
                }}>Go league</a>
               </>
            }
            </div>
      
}


export default withRouter(MyLeagues)


