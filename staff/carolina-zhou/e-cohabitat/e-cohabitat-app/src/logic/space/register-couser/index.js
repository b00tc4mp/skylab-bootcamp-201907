import { validate } from 'utils'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Registers a space co-user
 * 
 * @param {string} email
 * @param {string} passcode 
 * @param {string} spaceId
 * 
 * @returns {}
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