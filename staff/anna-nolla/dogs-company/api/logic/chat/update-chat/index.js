const { validate } = require('utils')
const { models: { Chat, Message, User } } = require('data')

/**
 * update chat through the messages
 * 
 * @param {string} id
 * @param {string} chatId
 * @param {string} text
 * 
* @returns {Promise}
*/

module.exports = function(id, chatId, text) {
    validate.string(id, 'user id')
    validate.string(chatId, 'chat id')
    validate.string(text, 'text')

    return (async () => {
        const date = new Date

        const user = await User.findById(id)
            if (!user) throw Error(`User does not exist.`)
    
        const chat = await Chat.findById(chatId)
            if (!chat) throw Error(`Chat does not exist.`)

        const message = new Message({ date, from: id, text })
            chat.messages.push(message)
            await chat.save()      
    })()
}