const {validate} = require('footcamp-utils')

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function ( token , leagueId) {
    
    // validate.string(id, 'id')
    // validate.string(code, 'code')
    
    return (async () => {
        
        const response = await fetch(`${REACT_APP_API_URL}/users/leagues/${leagueId}`, {

            method: 'get',
            headers: {
                 'authorization': `bearer ${token}`,        
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
