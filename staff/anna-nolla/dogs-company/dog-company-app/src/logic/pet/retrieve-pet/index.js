import { call, validate } from 'utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Retrieves a pet (one).
 * 
 * @param {string} petId
 * @param {string} this.__token__ 
 * 
 * @returns {Promise}
 */

export default function (petId) {
    validate.string(this.__token__, 'user id')
    validate.string(petId, 'pet id')

    return (async () => {
        const response = await call(`${REACT_APP_API_URL}/user/pet/${petId}` , 'get' , { 'authorization': `bearer ${this.__token__}` })
    
        if (response.error) {
            const { error } = response
                throw Error(error)
        }
        return response
    })()
}
