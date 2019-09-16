import React, { useState, useEffect, useContext } from 'react'
import logic from '../../logic'
import { withRouter} from 'react-router-dom'
import Context from '../Context'
import InitialHeader from '../InitialHeader'


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

     


    return <div>
                <InitialHeader />
                
                {leagues && 
                <div className="league">
                <h2 className="league__title">MY LEAGUES</h2>
            
                 <h3 className="league__name"> <p>Liga: {leagues.name}</p> </h3>
                 <h3> {leagues.nameTeam}</h3>
                
                <a href="" onClick={event => {
                    event.preventDefault()
                                      
                    history.push('/myteam')
                }}>Go to league</a>

               
               </div>
            }
            </div>
      
}


export default withRouter(MyLeagues)


