const { validate } = require('utils')
const { models: { User, Space } } = require('data')

/**
 * Registers a space co-user
 * 
 * @param {string} email 
 * @param {string} passcode
 * @param {string} spaceId
 * @param {string} id
 * 
 * @returns {Promise}
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