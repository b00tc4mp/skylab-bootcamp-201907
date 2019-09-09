const validate = require('../../../utils/validate')
const { models } = require('democratum-data')
const bcrypt = require('bcryptjs')
const { User } = models

/**
 *
 * @param {String} cityId
 * @param {String} fullname
 * @param {String} address
 * @param {String} documentId
 * @param {String} email
 * @param {String} imgDocId
 * @param {String} password
 * @param {String} passwordConfirm
 * @param {Array} participatedPolls
 * @param {Array} proposedPolls
 * @param {String} userRole
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
    /* validate.array(participatedPolls, 'participatedPolls')
    validate.array(proposedPolls, 'proposedPolls') */
    validate.string(userRole, 'userRole')

    return (async () => {

        let user = await User.findOne({ email })

        if (user) throw Error(`user with email ${email} already exists`)

        //const hash = await bcrypt.hash(password, 10) // he quitado password: hash
        
        user = new User({ cityId, fullname, address, documentId, email, imgDocId, password, participatedPolls, proposedPolls, userRole })

        await user.save()

        return user
    })()
}