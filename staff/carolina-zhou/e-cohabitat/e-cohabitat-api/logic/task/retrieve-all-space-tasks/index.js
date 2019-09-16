const { validate } = require('utils')
const { models: { Space } } = require('data')

/**
 * Retrieves all the tasks added in a particular space
 * 
 * @param {*} id 
 * @param {*} spaceId 
 * 
 * @returns {Promise}
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