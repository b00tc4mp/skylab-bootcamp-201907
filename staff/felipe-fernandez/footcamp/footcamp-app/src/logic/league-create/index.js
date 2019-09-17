// const {validate} = require('footcamp-utils')
import {validate} from 'footcamp-utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function ( name, code) {
    
    validate.string(name, 'name')
    validate.string(code, 'code')
    
    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/users/leagues`, {
    
            method: 'post',
            headers: {
               
                 'authorization': `bearer ${this.__token__}`,
                 'content-type': 'application/json' 
                
                },

               
            body: JSON.stringify({ name, code })
        })
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

