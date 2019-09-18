
const { validate } = require('utils')
const { models: { Chat, User } } = require('data')


/**
 * retrieve a chat with the id and the chat id 
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
        
        const chat = await Chat.findById(chatId, { __v: 0 }).populate("messages.from", "name").lean()
            if (!chat) throw Error(`This chat does not exist`)
             
        chat.participants.forEach((item , index) => {
            return chat.participants[index] = item.toString()
        })

        chat.messages.forEach((item, numb) => {
            delete chat.messages[numb]._id
        }) 

        const match = await chat.participants.indexOf(id)
            if (match < 0) throw Error('This user does not own this chat')
    
        chat.id = chat._id.toString()
        delete chat._id
        
        return chat
    })()
}