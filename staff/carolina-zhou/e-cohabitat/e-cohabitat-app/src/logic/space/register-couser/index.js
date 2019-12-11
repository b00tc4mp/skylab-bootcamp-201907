import { validate } from 'utils'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL


/**
 * Registers a space co-user.
 * 
 * @param {string} email co-user email
 * @param {string} passcode space passcode
 * @param {string} spaceId space id
 * 
 * @throws {TypeError} - if any of the parameters is not a string.
 * @throws {Error} - if any parameter is empty or undefined, if co-user or space is not found, if a wrong passcode is provided, if co-user is already registered in the space.
 * 
 * 
 * @returns {Object} space object.
*/

export default function(email, passcode, spaceId) {

    validate.string(email, 'co-user email')
    validate.string(passcode, 'space passcode')
    validate.string(spaceId, 'space id')

    const { id, token } = this.__userCredentials__

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/users/${id}/spaces/${spaceId}/cousers`, {
            method: 'PATCH',
            headers: {'Access-Control-Allow-Origin': '*', 'content-type': 'application/json', 'authorization': `bearer ${token}`},
            mode: 'cors',
            body: JSON.stringify({ email, passcode })
        })
    
        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }
    
        const { space } = await response.json()

        return space
    })()
}