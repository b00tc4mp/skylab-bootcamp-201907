const {validate} = require('footcamp-utils')

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function ( code, name, token) {
    
    validate.string(name, 'code')
    validate.string(code, 'name')
    
    return (async () => {
        
        const response = await fetch(`${REACT_APP_API_URL}/users/leagues/team`, {

            method: 'post',
            headers: {
               
                 'authorization': `bearer ${token}`,
                 'content-type': 'application/json' 
                
                },
   
            body: JSON.stringify({ code,name })
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
