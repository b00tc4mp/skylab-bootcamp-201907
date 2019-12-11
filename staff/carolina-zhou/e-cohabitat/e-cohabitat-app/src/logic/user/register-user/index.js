import { validate } from 'utils'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Registers a user.
 * 
 * @param {string} username user's username
 * @param {string} name user's real name
 * @param {string} surname user's real surname
 * @param {string} email user's email
 * @param {string} password user's password
 * 
 * @throws {TypeError} - if any parameter is not a string
 * @throws {Error} - if any parameter is empty/undefined. if there is already a user registered under the same email or username.

 */

export default function (username, name, surname, email, password) {

    validate.string(username, 'username')
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'e-mail')
    validate.email(email, 'e-mail@gmail.com')
    validate.string(password, 'password')

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/users`, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ username, name, surname, email, password })
        })

        if (response.status !== 201) {
            const { error } = await response.json()

            throw Error(error)
        }
    })()
}
