import { call, validate } from 'utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Registers a user.
 * 
 * @param {string} name 
 * @param {string} surname 
 * @param {string} email 
 * @param {string} password
 * @param {string} repassword
 * 
 */

export default function (name, surname, email, password, repassword) {
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'email')
    validate.email(email, 'email')
    validate.string(password, 'password')
    validate.string(repassword, 'repassword')
    
    if (password !== repassword) throw Error('Passwords do not match')

    return (async () => {
        const response = await call(`${REACT_APP_API_URL}/user` , 'post' , { 'content-type': 'application/json' }, { name, surname, email, password })
    
        if (response.error) {
            const { error } = response
                throw Error(error)
        }
        return response
    })()
}


