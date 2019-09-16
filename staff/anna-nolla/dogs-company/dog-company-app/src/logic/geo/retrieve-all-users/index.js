import { call, validate } from 'utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL
/**
 * retrieve all users with an static location.
 * 
 * @param {string} this.__token__
 * 
 */

export default function (distance) {

    validate.string(this.__token__, 'user id')
    
    return (async () => {
        const response = await call(`${REACT_APP_API_URL}/user/static/${distance}` , 'get' , 
        { 'authorization': `bearer ${this.__token__}` }, undefined)
    
        if (response.error) {
            const { error } = response
                throw Error(error)
        }
        return response
    })()
}