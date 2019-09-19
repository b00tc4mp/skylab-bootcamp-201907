const { validate } = require('utils')
const { models: { User, Space } } = require('data')

/**
 * Registers a space co-user.
 * 
 * @param {string} email co-user email
 * @param {string} passcode space passcode
 * @param {string} spaceId space id
 * @param {string} id existent user id
 * 
 * @throws {TypeError} - if any of the parameters is not a string.
 * @throws {Error} - if any parameter is empty or undefined, if co-user or space is not found, if a wrong passcode is provided, if co-user is already registered in the space.
 * 
 * 
 * @returns {Object} space object
*/

module.exports = function(email, passcode, spaceId, id) {

    let _space

    validate.string(email, 'co-user email')
    validate.string(passcode, 'space passcode')
    validate.string(spaceId, 'space id')
    validate.string(id, 'existent user id')

    return (async () => {
        const space = await Space.findOne({ _id: spaceId })
        if (!space) throw Error('wrong space id provided')
        if( space.passcode !== passcode) throw Error(`wrong credentials`)
        _space = space

        const user = await User.findOne({ email })
        if (!user) throw Error('wrong user email provided')

        user.id = user._id.toString()
        delete user._id

        const coUserId = user.id

        const match = _space.cousers.find(user => user.toString() === coUserId)
        if (match === coUserId) throw Error(`user already registered in space with id ${spaceId}`)

        user.spaces.push(spaceId)
        await user.save()

        _space.cousers.push(coUserId)
        await _space.save()

        return _space
    })()
}