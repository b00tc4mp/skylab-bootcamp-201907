const { validate } = require('../../../../e-cohabitat-utils')
const { models: { User, Space } } = require('../../../../e-cohabitat-data')

/**
 * Unregisters a space
 * 
 * @param {string} userId
 * @param {string} spaceId 
 * 
 * @returns {Promise}
*/

module.exports = function(userId, spaceId) {

    validate.string(userId, 'user id')
    validate.string(spaceId, 'space id')

    return (async () => {
        const user = await User.findById(userId)
        if(!user) throw Error(`there is no user with the provided user id`)

        const searchSpace = await Space.findById(spaceId)
        if(!searchSpace) throw Error(`there is no space with the provided space id`)

        const space = user.spaces.find(space => space.toString() === spaceId)
        if(space === undefined) throw Error('this user is not a co-user of the space introduced')

        const result = await Space.deleteOne({ _id: spaceId })
        if (!result.deletedCount) throw Error('wrong data provided')

        user.spaces.splice(user.spaces.indexOf(space), 1)
        user.save()
    })()
}