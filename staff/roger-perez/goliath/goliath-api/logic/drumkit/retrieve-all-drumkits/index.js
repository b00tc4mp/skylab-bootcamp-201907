const validate = require('../../../utils/validate')
const { User } = require('../../../data')

/**
 * Retrieves all the cards by its owner id
 * 
 * @param {*} id 
 * @returns {Promise}
 * 
*/

module.exports = function(id) {
    validate.string(id, 'creator')

    return (async () => {
        const user = await User.findById(id)
        const drumkits = user.drumkits

        if (!drumkits) throw Error(`this user does not have any drumkit`)

        return drumkits
    })()

}