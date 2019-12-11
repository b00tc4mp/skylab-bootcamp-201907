
import  {validate} from 'footcamp-utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Retrieves all the information of the player 
 * @param {*} playerId 
 */
export default function ( playerId) {
    
    validate.string(playerId, 'player id')
        
    return (async () => {
        
        const response = await fetch(`${REACT_APP_API_URL}/users/leagues/player/${playerId}`, {

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
