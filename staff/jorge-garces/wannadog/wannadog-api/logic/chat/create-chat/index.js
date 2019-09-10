const { validate } = require('wannadog-utils')
const { models } = require('wannadog-data')
const { User, Chat } = models

/**
 * Create a chat with another user
 * 
 * @param {String} id 
 * @param {String} participantId
 * 
 * @returns {Promise}
 */

module.exports = function (id, participantId) {
    validate.string(id, 'user id')
    validate.string(participantId, 'participant id')

    return (async () => {
        const user = await User.findById(id)
        if (!user) throw Error('User does not exists.')

        const participantUser = await User.findById(participantId)
        if (!participantUser) throw Error('User does not exists.')

        const chat_ = await Chat.findOne({ members: [id, participantId] })
        if (chat_) throw Error('chat already exists')

        const chat = await Chat.create({ members: [id, participantId] })

        return chat._id.toString()
    })()
}    