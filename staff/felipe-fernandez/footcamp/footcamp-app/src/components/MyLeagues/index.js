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
            debugger
            try {
            const leagueId  = await logic.retrieveAllLeagues()
            
            sessionStorage.league = leagueId
            const leagues = await logic.retrieveLeague(leagueId)

            setLeagues(leagues)
       
            const teamId = leagues.teams.find(team => { 
                if (team.owner === sessionStorage.id) return team._id
            })
            sessionStorage.team = teamId._id
            // setTeamId(teamId._id)
            // const owners= leagues.teams.map(result=> result.owner)
            
            // const teamId = owners.find(element =>{
            //     if (element === user.id) return element._id
            // })
         } catch({message}) {
            console.log('fail login', message)
          }
        })()
    }, [])

    // function leaveLeague(){

    //     return(async()=>{
    //     try {
            
    //         const leagueId  = await logic.retrieveAllLeagues()
    //         await logic.leaveLeague(leagueId)
    //         await logic.deleteTeam(leagueId, sessionStorage.team)
    //         sessionStorage.clear()
    //         history.push('/')
  
    //       } catch({message}) {
    //         console.log('fail login', message)
    //       }
    //   })()

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
                                      
                    history.push('/myteam')
                }}>Go league</a>

                {/* <button onClick={event => {
                    event.preventDefault()
                    leaveLeague()
                    
                }}>Leave the league</button> */}
               </>
            }
            </div>
      
}


export default withRouter(MyLeagues)


