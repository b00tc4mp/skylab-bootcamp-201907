import  {validate} from 'footcamp-utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Create a league with name and code and it relates to the user
 * @param {*} leagueId 
 * @param {*} teamId 
 */
export default function (leagueId, teamId) {
    

    validate.string(leagueId, 'league id')
    validate.string(teamId, 'team id')
    
    return (async () => {
        debugger
        
        const response = await fetch(`${REACT_APP_API_URL}/users/leagues/${leagueId}/team/${teamId}/lineup`, {

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