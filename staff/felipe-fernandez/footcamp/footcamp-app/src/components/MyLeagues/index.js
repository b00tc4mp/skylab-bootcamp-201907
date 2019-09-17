import React, { useState, useEffect} from 'react'
import logic from '../../logic'
import { withRouter} from 'react-router-dom'

import InitialHeader from '../InitialHeader'


function MyLeagues (props) {
    const [leagues, setLeagues] = useState(null)
    const [error , setError] = useState(undefined) 
    const { history} = props
    

    useEffect(() => {
        (async () => {
            
            try {
            const leagueId  = await logic.retrieveAllLeagues()
            
            sessionStorage.league = leagueId
            const leagues = await logic.retrieveLeague(leagueId)

            setLeagues(leagues)
       
            const teamId = leagues.teams.find(team => { 
                if (team.owner === sessionStorage.id) return team._id
            })
            sessionStorage.team = teamId._id
           
         } catch({message}) {
            setError(message)
          }
        })()
    }, [])

     


    return <div>
                <InitialHeader />
                <h2 className="league-title">MY LEAGUES</h2>

                {leagues && 
                <div className="league">
                
            
                 <h3 className="league__name"> <p>Liga: {leagues.name}</p> </h3>
                 <h3> {leagues.nameTeam}</h3>
                
                <a href="" onClick={event => {
                    event.preventDefault()
                                      
                    history.push('/myteam')
                }}><i class="fas fa-arrow-alt-circle-right fa-2x"></i></a>

               
               </div>
            }
            </div>
      
}


export default withRouter(MyLeagues)


