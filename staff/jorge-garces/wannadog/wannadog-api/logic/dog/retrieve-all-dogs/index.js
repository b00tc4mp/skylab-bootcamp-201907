const { validate } = require('wannadog-utils')
const { models } = require('wannadog-data')
const { User } = models

/**
 * Retrieves all dogs from a user
 * 
 * @param {string} id
 * 
 * @returns {Promise}
*/

module.exports = function (id) {

    validate.string(id, 'user ID')

    return (async () => {

        if (!(await User.findById(id))) throw Error(`user with id ${id} not found`)
        let { dogs } = await User.findById(id).populate('dogs').lean()

        dogs.map(dog => {
            dog.id = dog._id.toString()
            delete dog._id
            delete dog.__v
            dog.gender === true ? dog.gender = "Male" : dog.gender === "Female"
        })
        return dogs
    })()

}