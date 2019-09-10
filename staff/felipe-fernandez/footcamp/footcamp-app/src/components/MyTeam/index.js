import React, { useState, useEffect, useContext } from 'react'
import logic from '../../logic'
import { withRouter} from 'react-router-dom'
import Context from '../Context'
import PlayerResult from '../PlayerResult'


function MyTeam (props) {
  
    const { team, setTeam, teamName, setTeamName, teamId, setTeamId } = useContext(Context)
    const { history} = props
    

    useEffect(() => {
        (async () => {
            const token = logic.userCredentials
            const team  = await logic.retrieveTeam(token, teamId)

            setTeam(team)
        })()
    }, [])

    return <ul>
            {team && team.map(teams => <li  key={teams.id}> <PlayerResult player={teams} /> </li>)}
    </ul>
}



export default withRouter(MyTeam)
