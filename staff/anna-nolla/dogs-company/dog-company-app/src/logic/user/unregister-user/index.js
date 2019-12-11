import { call, validate } from 'utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Unregister a user.
 * 
 * @param {string} this.__token__
 * @param {string} password
 * 
 */

export default function (password) {
    validate.string(this.__token__, 'user id')
    validate.string(password, 'password')

    return (async () => {
        const response = await call(`${REACT_APP_API_URL}/user` , 'delete' , { 'authorization': `bearer ${this.__token__}` }, { password })
    
        if (response.error) {
            const { error } = response
                throw Error(error)
        }
        return response
    })()
}

