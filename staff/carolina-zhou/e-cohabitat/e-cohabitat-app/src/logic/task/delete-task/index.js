import { validate } from 'utils'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Deletes a task
 * 
 * @param {string} spaceId 
 * @param {string} taskId 
 * 
 * @returns {}
*/

export default function(spaceId, taskId) {

    validate.string(spaceId, 'space id')
    validate.string(taskId, 'task id')

    const { id, token } = this.__userCredentials__

    return (async() => {

        const response = await fetch(`${REACT_APP_API_URL}/users/${id}/spaces/${spaceId}/tasks/${taskId}`, {
            method: 'delete',
            headers: { 'authorization': `bearer ${token}` }
        })

        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }
    })()
}
