const {validate} = require('footcamp-utils')

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function ( name, token, leagueId) {
    
    validate.string(name, 'code')
   
    debugger
    return (async () => {
        
        const response = await fetch(`${REACT_APP_API_URL}/users/leagues/${leagueId}/team`, {

            method: 'post',
            headers: {
               
                 'authorization': `bearer ${token}`,
                 'content-type': 'application/json' 
                
                },
   
            body: JSON.stringify({ name })
        })
        debugger
        const responseJson =await response.json()

        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }
        
        else {
            
            return  responseJson
        }
       
    })()
}
