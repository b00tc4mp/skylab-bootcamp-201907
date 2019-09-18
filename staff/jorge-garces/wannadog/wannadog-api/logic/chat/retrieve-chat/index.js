const { validate } = require('wannadog-utils')
const { models } = require('wannadog-data')
const { User, Chat } = models


/**
 * retrieve a chat with the id and the chat id 
 * 
 * @param {string} id
 * @param {string} chatId
 * 
 * @returns {Promise}
*/

module.exports = function (id, chatId) {

    validate.string(id, 'user id')
    validate.string(chatId, 'chat id')

    return (async () => {
        const user = await User.findById(id)
        if (!user) throw Error('This user does not exist')

        const chat = await Chat.findById(chatId, { __v: 0 }).populate("messages.user", "name").lean()
        if (!chat) throw Error(`This chat does not exist`)

        chat.members.forEach((item, index) => {
            return chat.members[index] = item.toString()
        })

        chat.messages.forEach((item, numb) => {
            delete chat.messages[numb]._id
        })

        const match = await chat.members.indexOf(id)
        if (match < 0) throw Error('This user does not own this chat')

        chat.id = chat._id.toString()
        delete chat._id


        return chat
    })()
}