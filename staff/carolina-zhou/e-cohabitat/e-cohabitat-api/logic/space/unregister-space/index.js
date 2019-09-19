const { validate } = require('utils')
const { models: { User, Space } } = require('data')

/**
 * Unregisters a space.
 * 
 * @param {string} userId user id
 * @param {string} spaceId space id
 * @param {string} passcode space passcode
 * 
 * @throws {TypeError} - if any of the parameters is not a string.
 * @throws {Error} - if any of the parameters id empty or undefined, if user or space is not found, if user is not a co-user of the provided space, if wrong passcode is provided.
 * 
 * @returns {Promise}
*/

module.exports = function(userId, spaceId, passcode) {

    validate.string(userId, 'user id')
    validate.string(spaceId, 'space id')
    validate.string(passcode, 'space passcode')

    return (async () => {
        const user = await User.findById(userId)
        if(!user) throw Error(`there is no user with the provided user id`)

        const searchSpace = await Space.findById(spaceId)
        if(!searchSpace) throw Error(`there is no space with the provided space id`)

        const space = user.spaces.find(space => space.toString() === spaceId)
        if(space === undefined) throw Error('this user is not a co-user of the space introduced')

        const result = await Space.deleteOne({ _id: spaceId, passcode })
        if (!result.deletedCount) throw Error('wrong data provided')

        user.spaces.splice(user.spaces.indexOf(space), 1)
        await user.save()
    })()
}