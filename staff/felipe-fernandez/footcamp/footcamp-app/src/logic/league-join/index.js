import {validate} from 'footcamp-utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL
/**
 * User joins to an existent league
 * @param {*} code 
 */
export default function ( code) {
      
    validate.string(code, 'code')
  
    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/users/leagues/join`, {

            
            method: 'post',
            headers: {
               
                 'authorization': `bearer ${this.__token__}`,
                 'content-type': 'application/json' 
                
                },

               
            body: JSON.stringify({ code })
        })
       
        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }
        else {
            const {leagueId} =await response.json()
            return  leagueId
        }
    })()
}

