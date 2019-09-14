// const {validate} = require('footcamp-utils')
import  {validate} from 'footcamp-utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function ( leagueId ,teamId, id1, id2) {
    
    
    validate.string(leagueId, 'league id')
    validate.string(teamId, 'team id')
    validate.string(id1, 'id1')
    validate.string(id2, 'id2')
    
    return (async () => {
        
        const response = await fetch(`${REACT_APP_API_URL}/users/leagues/${leagueId}/team/${teamId}`, {

            method: 'post',
            headers: {
               
                 'authorization': `bearer ${this.__token__}`,
                 'content-type': 'application/json' 
                
                },
                body: JSON.stringify({'in': id1, 'out': id2})
   
        })
        
                await response.json()

        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }
        
        else {
            
            return  
        }
       
    })()
}
