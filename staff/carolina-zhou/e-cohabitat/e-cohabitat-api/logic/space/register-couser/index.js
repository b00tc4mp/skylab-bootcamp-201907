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

    validate.string(spaceId, 'space id')
    validate.string(coUserId, 'co-user id')

    return (async () => {
        const space = await Space.findOne({ _id: spaceId })
        if (!space) throw Error('wrong space id provided')

        const user = await User.findOne({ _id: coUserId })
        if (!user) throw Error('wrong user id provided')

        const match = space.cousers.find(user => user === coUserId)
        if (match) throw Error(`user already registered in space with id ${spaceId}`)
        
        space.cousers.push(coUserId)
        
        return space.save()
    })()
}