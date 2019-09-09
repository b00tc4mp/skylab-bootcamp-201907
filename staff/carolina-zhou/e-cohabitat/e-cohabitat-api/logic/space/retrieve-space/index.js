const { validate } = require('utils')
const { models: { Space } } = require('data')

/**
 * Retrieves a space by its id
 * 
 * @param {*} id
 * 
 * @returns {Promise}
*/

module.exports = function(id) {
    
    validate.string(id, 'space id')

    return (async () => {
        const space = await Space.findOne({ _id: id }, { _id: 0 }).lean()
        if (!space) throw Error(`space with id ${id} does not exist.`)
        space.id = id
        return space
    })()
}