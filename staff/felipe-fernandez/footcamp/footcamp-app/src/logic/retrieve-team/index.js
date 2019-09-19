
import  {validate} from 'footcamp-utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Retrieves a team by name within the league and linked to the user 
 * @param {*} leagueId 
 * @param {*} teamId 
 */
export default function (leagueId, teamId ) {
    
    validate.string(teamId, 'team id')
    validate.string(leagueId, 'league id')
    
    return (async () => {
        
        const response = await fetch(`${REACT_APP_API_URL}/users/leagues/${leagueId}/team/${teamId}`, {

            method: 'get',
            headers: {
               
                 'authorization': `bearer ${this.__token__}`,
                           
                }
               
        })
        
        const responseJson = await response.json()

        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }
        else {
            return responseJson
        }
       
    })()
}
