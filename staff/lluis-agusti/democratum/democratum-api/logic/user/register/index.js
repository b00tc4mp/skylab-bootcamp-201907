const validate = require('../../../utils/validate')
const { models } = require('democratum-data')
const bcrypt = require('bcryptjs')
const { User } = models

/**
 * Registers a new user.
 *
 * @param {String} cityId The id of the city.
 * @param {String} name Name of the citizen.
 * @param {String} surname Surname of the citizen.
 * @param {String} address Address of the citizen.
 * @param {String} documentId id of the citizen.
 * @param {String} email email of the citizen.
 * @param {String} password Password.
 * @param {Array} participatedPolls ids of the polls where the user has participated.
 * @param {Array} proposedPolls ids of the polls that the citizen has proposed.
 * @param {String} userRole role: citizen or admin.
 *
 * @returns {Promise}
 */

module.exports = function(cityId, fullname, address, documentId, email, imgDocId, password, participatedPolls, proposedPolls, userRole) {

    validate.string(cityId, 'cityId')
    validate.string(fullname, 'fullname')
    validate.string(address, 'address')
    validate.string(documentId, 'documentId')
    validate.string(email, 'email')
    validate.email(email, 'email')
    validate.string(imgDocId, 'imgDocId')
    validate.string(password, 'password')
    validate.string(userRole, 'userRole')

    return (async () => {

        let user = await User.findOne({ email })

        if (user) throw Error(`user with email ${email} already exists`)

        const hash = await bcrypt.hash(password, 10)
        
        user = new User({ cityId, fullname, address, documentId, email, imgDocId, password: hash, participatedPolls, proposedPolls, userRole })

        await user.save()

        return user
    })()
}