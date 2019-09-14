// const {validate} = require('footcamp-utils')
import  {validate} from 'footcamp-utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function ( name, leagueId) {
    
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
        
        

        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }
        
        else {
            
            return  await response.json()
        }
       
    })()
}
