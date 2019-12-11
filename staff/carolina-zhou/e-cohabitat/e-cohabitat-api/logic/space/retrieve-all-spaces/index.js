const { validate } = require('utils')
const { models: { Space } } = require('data')

/**
 * Retrieves all the spaces shared by a particular user
 * 
 * @param {*} id user id
 * 
 * @throws {TypeError} - if user id is not a string.
 * @throws {Error} - if any user id is empty or undefined, if user does not share any spaces.
 * 
 * @returns {Array} array of space objects
*/

module.exports = function(id) {
    
    validate.string(id, 'user id')

    return (async() => {
        const spaces = await Space.find({ cousers : id }, { __v: 0 }).lean()
        if (!spaces) throw Error(`user with id ${id} does not own any spaces`)

        spaces.forEach(space => {
            space.id = space._id
            delete space._id
        })
        return spaces
    })()
}