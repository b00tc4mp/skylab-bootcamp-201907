const validate = require('../../../utils/validate')
const { User, Space } = require('../../../data')

/**
 * Registers a space co-user
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
        const space = await Space.findOne({ _id: spaceId })

        if (!space) throw Error('wrong space id provided')

        _space = space

        const user = await User.findOne({ _id: coUserId })

        if (!user) throw Error('wrong user id provided')

        const match = _space.users.find(user => user === coUserId)

        if (match) throw Error(`user already registered in space with id ${spaceId}`)
        
        _space.users.push(coUserId)
        
        return _space.save()
    })()
}