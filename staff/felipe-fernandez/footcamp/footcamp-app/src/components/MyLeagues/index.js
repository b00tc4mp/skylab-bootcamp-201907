import React, { useState, useEffect, useContext } from 'react'
import logic from '../../logic'
import { withRouter} from 'react-router-dom'
import Context from '../Context'



function MyLeagues (props) {
    const [leagues, setLeagues] = useState(null)
    const [points, setPoints] = useState(null)
    const { user, team, setTeam,  teamId, setTeamId, player, setPlayer, leagueId, setLeagueId } = useContext(Context)
    const { history} = props
    

    useEffect(() => {
        (async () => {
            
            const token = logic.userCredentials
            const leagueId  = await logic.retrieveAllLeagues(token)
            setLeagueId(leagueId)
               
            const {league:leagues} = await logic.retrieveLeague(token, leagueId)

            //let leagues = Object.values(leagues3)
            setLeagues(leagues)
            
            //match the team's users connected with the teams in the league
            // const user = await logic.retrieveAllLeagues(token)
            debugger

            const teamId = leagues.teams.find(team => { 
                if (team.owner === user.id) return team._id
            })
            
            setTeamId(teamId._id)
            // const owners= leagues.teams.map(result=> result.owner)
            
            // const teamId = owners.find(element =>{
            //     if (element === user.id) return element._id
            // })
           
        })()
    }, [])

 


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
                   
                    
                    history.push('/home-landing')
                }}>Go league</a>
               </>
            }
            </div>
      
}


export default withRouter(MyLeagues)


