const { validate } = require('utils')
const { models: { User, Chat } } = require('data')

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

        const chat_ = await Chat.findOne({ participants: [id, participantId] })
        if (chat_) throw Error(`${chat_._id}, chat already exists`)

        const chat = await Chat.create({ participants: [id, participantId] })
                    
        return chat._id.toString()
    })()
}    