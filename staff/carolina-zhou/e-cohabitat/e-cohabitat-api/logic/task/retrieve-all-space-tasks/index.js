const { validate } = require('utils')
const { models: { Space } } = require('data')

/**
 * Retrieves all the tasks added in a particular space
 * 
 * @param {*} id user id
 * @param {*} spaceId space id
 * 
 * @throws {TypeError} - if space id or user id is not a string.
 * @throws {Error} - if space id or user id is empty or undefined, if space is not found.
 * 
 * @returns {Array} task id array
*/

module.exports = function(id, spaceId) {
    
    validate.string(id, 'user id')
    validate.string(spaceId, 'space id')

    return (async() => {

        const space = await Space.findById(spaceId).populate('spaceTasks')
        if (!space) throw Error(`space with id ${spaceId} does not exist`)

        return space.spaceTasks
    })()
}