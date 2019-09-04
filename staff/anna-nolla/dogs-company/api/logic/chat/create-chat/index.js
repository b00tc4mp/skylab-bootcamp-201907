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

module.exports = function(id, participantId) {
    validate.string(participantId, 'participant id')
    validate.string(id, 'user id')

    return (async () => {
        const user = await User.findById(id)
            if (!user) throw Error('User does not exists.')
            else {
                const participantUser = await User.findById(participantId)
                    if (!participantUser) throw Error('User does not exists.')
                    else{
                        // const chatP = await Chat.participants.find(chatP => (chatP.participants.includes(id, participantId)))
                        //     if (chatP) throw Error('chat already exists')
                            // else{
                                const chatC = await new Chat({})
                                chatC.participants.push(id, participantId)
                                const chat = await chatC.save()
                                return chat._id.toString()
                            // }
                    }
            }
    })()
}    