const { validate } = require('utils')
const { models: { Space } } = require('data')

/**
 * Updates a space.
 * 
 * @param {*} spaceId space id
 * @param {*} dataToUpdate data to update
 * 
 * @throws {TypeError} - if space id is not a string, if data to update is not an object.
 * @throws {Error} - if space id is empty or undefined, if space is not found.
 * 
 * @returns {Promise}
*/

module.exports = function(spaceId, dataToUpdate) {
    
    validate.string(spaceId, 'space id')
    validate.object(dataToUpdate, 'body')

    return (async() => {
        const space = await Space.findByIdAndUpdate(spaceId, { $set: dataToUpdate })
            
        if (!space) throw new Error(`space with id ${spaceId} does not exist`)
    })()
}