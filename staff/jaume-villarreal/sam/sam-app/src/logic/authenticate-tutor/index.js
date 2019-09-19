import utils from 'utils'

const { validate } = utils
const REACT_APP_DB_URL = process.env.REACT_APP_DB_URL

/**
 * Retrieves all students by tutor id.
 * 
 * @param {string} email 
 * @param {string} password 
 * 
 * @returns {Promise}
 */

export default function (email, password) {
    validate.string(email, 'email')
    validate.email(email, 'email')
    validate.string(password, 'password')

    return (async () => {

        const headers = { "content-type" : "application/json" }
        const body = JSON.stringify({ email, password })

        const response = await fetch(`${REACT_APP_DB_URL}/tutors/auth`, {
            method: 'POST',
            headers: headers,
            body: body
        })
        
        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        } 
        else {
            const { token } = await response.json()
            this.__token__ = (token)   
        }   
    })()
}