import { call, validate } from 'utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL
/**
 * Authenticates a user.
 *  
 * @param {string} email 
 * @param {string} password
 * 
 */

export default function (email, password) {
    validate.string(email, 'email')
    validate.email(email, 'email')
    validate.string(password, 'password')

    return (async () => {
        const response = await call(`${REACT_APP_API_URL}/auth` , 'post' , { 'content-type': 'application/json' }, { email, password })
    
        if (response.error) {
            const { error } = response
                throw Error(error)
        }
        this.__token__ = response.token
        return 
    })()
}