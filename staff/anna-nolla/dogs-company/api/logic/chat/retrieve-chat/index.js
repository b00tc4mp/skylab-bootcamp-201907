
const { validate } = require('utils')
const { models: { Chat, User } } = require('data')


/**
 * 
 * @param {string} id
 * @param {string} chatId
 * 
 * @returns {Promise}
*/

module.exports = function(id, chatId) {
    
    validate.string(id, 'user id')
    validate.string(chatId, 'chat id')

    return (async () => {
        const user = await User.findById(id)
            if (!user) throw Error('This user does not exist')
        
        const chat = await Chat.findById(chatId).lean()
            if (!chat) throw Error(`This chat does not exist`)
            
        chat.participants.forEach((item , index) => {
            return chat.participants[index] = item.toString()
        })

        const match = await chat.participants.indexOf(id)
            if (match < 0) throw Error('This user does not own this chat')
    
        chat.id = chat._id.toString()

        return chat
    })()
}