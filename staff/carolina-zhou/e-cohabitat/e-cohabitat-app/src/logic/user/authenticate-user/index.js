import { validate } from 'utils'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Authenticates a user by its credentials.
 * 
 * @param {string} email 
 * @param {string} password 
 * 
 * @returns {}
 */

export default function (email, password) {
    validate.string(email, 'e-mail')
    validate.email(email, 'e-mail')
    validate.string(password, 'password')

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/auth`, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        if (response.status === 200) {
            const { id, token } = await response.json()

            this.__userCredentials__ = { id, token }
        } else {
            const { error } = await response.json()
            throw Error(error)
        }
    })()
}