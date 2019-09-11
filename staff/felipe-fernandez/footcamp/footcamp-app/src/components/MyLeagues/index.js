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
         
            const leagues = result.leagues.map(results=> results)
            setLeagues(leagues)
            // const points  = result.leagues.map(results=> results.points)
            // setPoints(points)
           
                 
        })()
    }, [])

    function goToLeagues(){
        
         history.push('/home-landing')
    }

    return <div>
                <h2>MY LEAGUES</h2>
            <ul>
                 {leagues && leagues.map(league => <li  key={league.id}> 
                <h3> {league.name} </h3>
                <h3> {league.points}</h3>
                
                <a href="" onClick={event => {
                    event.preventDefault()
                    goToLeagues()
                    setTeamId(league.team)
                    setLeagueId(league.id)
                }}>Go league</a>
                           
                </li>)}
            </ul>
            
        </div>
}


export default withRouter(MyLeagues)


