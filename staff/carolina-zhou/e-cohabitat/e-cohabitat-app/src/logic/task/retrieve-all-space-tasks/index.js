import { validate } from 'utils'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Retrieves all the tasks added in a particular space
 * 
 * @param {*} spaceId space id
 * 
 * @throws {TypeError} - if space id or user id is not a string.
 * @throws {Error} - if space id or user id is empty or undefined, if space is not found.
 * 
 * @returns {Array} space tasks array.
*/

export default function(spaceId) {

    validate.string(spaceId, 'space id')
    
    const { id, token } = this.__userCredentials__

    return (async() => {

        const response = await fetch(`${REACT_APP_API_URL}/users/${id}/spaces/${spaceId}/tasks`, {
            method: 'get',
            headers: { 'authorization': `bearer ${token}` }
        })

        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }

        const { spaceTasks } = await response.json()
        return spaceTasks
    })()
} 