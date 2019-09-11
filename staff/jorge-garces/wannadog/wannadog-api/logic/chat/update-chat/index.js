const { validate } = require('wannadog-utils')
const { models } = require('wannadog-data')
const { User, Chat, Message } = models

/**
 * update chat through the messages
 * 
 * @param {string} id
 * @param {string} chatId
 * @param {string} text
 * 
* @returns {Promise}
*/

module.exports = function (id, chatId, body) {
    validate.string(id, 'user id')
    validate.string(chatId, 'chat id')
    validate.string(body, 'body')

    return (async () => {
        const date = new Date

        const user = await User.findById(id)
        if (!user) throw Error(`User does not exist.`)

        const chat = await Chat.findById(chatId)
        if (!chat) throw Error(`Chat does not exist.`)

        const message = new Message({ date, user: id, body })
        chat.messages.push(message)
        await chat.save()
    })()
}