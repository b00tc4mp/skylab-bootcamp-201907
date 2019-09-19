import { validate } from 'utils'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL


/**
 * Adds a task
 * 
 * @param {*} taskName task name
 * @param {*} taskType task type
 * @param {*} description task description
 * @param {*} date task date
 * @param {*} spaceId space id
 * 
 * @throws {TypeError} - if any of the parameters is not a string (except the date parameter), if date is not a date.
 * @throws {Error} - if any of the parameters is empty or undefined, if user/space is not found.
 * 
 * @returns {}
 */

export default function (taskName, taskType, description, date, spaceId) {

    validate.string(taskName, 'task name')
    validate.string(taskType, 'task type')
    validate.string(description, 'task description')
    validate.date(date, 'task date')
    validate.string(spaceId, 'space id')

    const { id, token } = this.__userCredentials__

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/users/${id}/spaces/${spaceId}/tasks`, {
            method: 'post',
            headers: { 'authorization': `bearer ${token}`, 'content-type': 'application/json' },
            body: JSON.stringify({ taskName, taskType, description, date })
        })
        

        if (response.status !== 201) {
            const { error } = await response.json()

            throw Error(error)
        }
        
    })()
}    

