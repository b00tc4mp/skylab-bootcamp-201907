const { validate } = require('utils')
const { models: { Space } } = require('data')

/**
 * Retrieves a space by its id
 * 
 * @param {*} id space id
 * 
 * @throws {TypeError} - if space id is not a string.
 * @throws {Error} - if space id is empty or undefined, if space is not found.
 * 
 * @returns {Object} space object
*/

module.exports = function(id) {
    
    validate.string(id, 'space id')

    return (async () => {
        const space = await Space.findOne({ _id: id }, { _id: 0 }).lean().populate('cousers')
        if (!space) throw Error(`space with id ${id} does not exist.`)
        space.id = id
        
        return space
    })()
}