// const {validate} = require('footcamp-utils')
import {validate} from 'footcamp-utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (leagueId) {
    
    validate.string(leagueId, 'league id')
   
    return (async () => {
        
        const response = await fetch(`${REACT_APP_API_URL}/users/leagues/${leagueId}`, {

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
