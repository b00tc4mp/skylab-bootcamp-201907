import { call, validate } from 'utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Retrieves all the pets an owner has.
 * 
 * @param {string} this.__token__ 
 * 
 * @returns {Promise}
 */

export default function () {
    validate.string(this.__token__, 'user id')

    return (async () => {
        const response = await call(`${REACT_APP_API_URL}/user/pet` , 'get' , { 'authorization': `bearer ${this.__token__}` })
    
        if (response.error) {
            const { error } = response
                throw Error(error)
        }
        return response
    })()
}


