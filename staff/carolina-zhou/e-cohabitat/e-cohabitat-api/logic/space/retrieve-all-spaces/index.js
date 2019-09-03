const validate = require('../../../utils/validate')
const { Space } = require('../../../data')

/**
 * Retrieves all the spaces shared by a particular user
 * 
 * @param {*} id 
 * 
 * @returns {Promise}
*/

module.exports = function(id) {
    
    validate.string(id, 'user id')

    return (async() => {
        const spaces = await Space.find({ cousers : id }, { __v: 0 }).lean()
        if (!spaces) throw Error(`user with id ${id} does not own any spaces`)

        spaces.forEach(space => {
            space.id = space._id
            delete space._id

            return space
        })
    })()
}