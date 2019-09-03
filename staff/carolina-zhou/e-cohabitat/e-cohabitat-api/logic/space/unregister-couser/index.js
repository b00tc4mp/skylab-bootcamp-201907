const validate = require('../../../utils/validate')
const { User, Space } = require('../../../data')

/**
 * Unregisters a property owner
 * 
 * @param {string} spaceId
 * @param {string} coUserId 
 * 
 * @returns {Promise}
*/

module.exports = function(spaceId, coUserId) {

    let _space

    validate.string(spaceId, 'space id')
    validate.string(coUserId, 'co-user id')

    return (async () => {
        const space = await Space.findOne({ spaceId })
        if (!space) throw Error('wrong space id provided')
        _space = space

        const user = await User.findOne({ _id: coUserId })
        if (!user) throw Error('wrong co-user id provided')
        const match = _space.users.find(user => user.toString() === coUserId)
        if (!match) throw Error(`user with id ${coUserId} is not a co-user`)
        _space.users.splice(_space.users.indexOf(match))
        return _space.save()
    })()
}