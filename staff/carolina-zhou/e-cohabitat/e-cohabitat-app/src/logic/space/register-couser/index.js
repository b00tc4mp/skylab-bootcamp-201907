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

    const { id, token } = this.__userCredentials__
debugger
    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/users/${id}/spaces/${spaceId}/cousers`, {
            method: 'patch',
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