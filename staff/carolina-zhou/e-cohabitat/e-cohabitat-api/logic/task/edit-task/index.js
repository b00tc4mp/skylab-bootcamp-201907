const { validate } = require('../../../../e-cohabitat-utils')
const { models: { Task } } = require('../../../../e-cohabitat-data')

/**
 * Edits a task
 * 
 * @param {*} id
 * @param {*} dataToUpdate 
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