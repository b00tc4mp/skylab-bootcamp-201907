const { validate } = require('utils')
const { models: { Task } } = require('data')

/**
 * Edits a task.
 * 
 * @param {*} id task id
 * @param {*} dataToUpdate data to update.
 * 
 * @throws {TypeError} - if task id is not a string, if data to update is not an object.
 * @throws {Error} - if task id is empty or undefined, if task is not found.
 * 
* @returns {Promise}
*/

module.exports = function(id, dataToUpdate) {
    validate.string(id, 'task id')
    validate.object(dataToUpdate, 'body')

    return (async() => {
        const task = await Task.findByIdAndUpdate(id, { $set: dataToUpdate })
            
        if (!task) throw new Error(`task with id ${id} does not exist`)
    })()
}