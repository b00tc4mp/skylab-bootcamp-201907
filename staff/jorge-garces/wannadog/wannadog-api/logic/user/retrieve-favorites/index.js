const { validate } = require('wannadog-utils')
const { models } = require('wannadog-data')
const { User } = models

/**
 * Retrieves favorite dogs
 * 
 * @param {string} id
 * 
* @returns {Promise}
*/
module.exports = function (id) {

    validate.string(id, 'user ID')

    return (async () => {
        let { favorites } = await User.findById(id).populate('favorites').lean()
        if (!id) throw Error(`User with id ${id} not found`)

        favorites.map(favorite => {
            favorite.id = favorite._id.toString()
            delete favorite._id
            delete favorite.__v
            favorite.gender === true ? favorite.gender = "Male" : favorite.gender === "Female"
        })

        return favorites
    })()
}