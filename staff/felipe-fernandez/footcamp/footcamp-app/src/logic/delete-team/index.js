// const {validate} = require('footcamp-utils')
import  {validate} from 'footcamp-utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function ( leagueId ,teamId) {
    
    
    validate.string(leagueId, 'league id')
    validate.string(teamId, 'team id')
    
    return (async () => {
        
        const response = await fetch(`${REACT_APP_API_URL}/users/leagues/${leagueId}/team/${teamId}`, {

            method: 'delete',
            headers: {
               
                 'authorization': `bearer ${this.__token__}`,
                 'content-type': 'application/json' 
                
                }
   
        })
        
        const responseJson =await response.json()

        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }
        
        else {
            
            return  
        }
       
    })()
}
