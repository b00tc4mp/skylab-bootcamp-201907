import { call, validate } from 'utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL
/**
 * Retrieve a user.
 * 
 * @param {string} this.__token__
 *
 * @returns {Promise} the user id  
 */

export default function (id) {
    validate.string(id, 'user id')

    return (async () => {
        const response = await call(`${REACT_APP_API_URL}/user/detail/${id}` , 'get' )
    
        if (response.error) {
            const { error } = response
                throw Error(error)
        }
        return response
    })()
}


