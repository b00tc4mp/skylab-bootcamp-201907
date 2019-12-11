
import  {validate} from 'footcamp-utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Retrieves all the leagues of the user where he's a participant
 * @param {*} leagueId 
 */
export default function ( leagueId ) {
    
    validate.string(leagueId, 'league id')
    
    return (async () => {
        debugger
        const response = await fetch(`${REACT_APP_API_URL}/users/leagues/${leagueId}/table`, {

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
