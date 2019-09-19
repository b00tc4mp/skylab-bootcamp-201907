
import  {validate} from 'footcamp-utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Creates a team by name within the league and linked to the user 
 * @param {*} name 
 * @param {*} leagueId 
 */

export default function (name, leagueId) {
    
    validate.string(name, 'name')
    validate.string(leagueId, 'league id')
   
    
    return (async () => {
        
        const response = await fetch(`${REACT_APP_API_URL}/users/leagues/${leagueId}/team`, {

            method: 'post',
            headers: {
               
                 'authorization': `bearer ${this.__token__}`,
                 'content-type': 'application/json' 
                
                },
   
            body: JSON.stringify({ name })
        })

        const responseJson = await response.json()
        

        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }
        
        else {
            
            return  responseJson
        }
       
    })()
}
