// const { env: { REACT_APP_API_URL } } = process
const { validate} = require('vltra-utils')
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Sends info to api to create a user on db.
 * 
 * @param {string} name user's name
 * @param {string} surname user's surname
 * @param {string} nickname user's nickname
 * @param {string} email user's email
 * @param {string} password user's password (get crypt on api).
 * @param {string} repassword user's password confirmation
 */

export default function (name, surname, nickname, email, password, repassword) {
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(nickname, 'nickname')
    validate.string(email, 'email')
    validate.email(email, 'email')
    validate.string(password, 'password')
    validate.string(repassword, 'repassword')

    if(password !== repassword) throw Error('El password ingresado y su comprobación no coinciden, ¡revísalos!')
    
    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/users`, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ name, surname, nickname, email, password })
        })

        if (response.status !== 201) {
            const { error } = await response.json()

            throw Error(error)
        }
    })()
}