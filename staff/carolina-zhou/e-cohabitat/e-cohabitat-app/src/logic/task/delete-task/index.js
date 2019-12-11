import { validate } from 'utils'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL


/**
 * Deletes a task.
 * 
 * @param {string} spaceId space id
 * @param {string} taskId task id
 * 
 * @throws {TypeError} - if any of the parameters is not a string.
 * @throws {Error} - if any of the parameters is empty or undefined, if user/space/task is not found, if user did not register the provided task, if space does not include the provided task.
 * 
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
