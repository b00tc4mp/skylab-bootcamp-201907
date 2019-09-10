const { validate } = require('wannadog-utils')
const { models } = require('wannadog-data')
const { User, Chat } = models

/**
 * to retrieve all the chats that a user has
 * 
 * @param {string} id
 * 
 * @returns {Promise}
 * 
*/

module.exports = function (id) {

    validate.string(id, 'user id')

    return (async () => {

        const user = await User.findById(id)
        if (!user) throw Error(`This user does not exist.`)

        const chats = await Chat.find({ 'members': id }, { __v: 0 }).lean()
        if (chats.length === 0) throw Error(`This user does not own any chats`)

        chats.forEach((chat, index) => {
            chats[index].id = chat._id.toString()
            delete chat._id
            chat.members.forEach((item, numb) => {
                return chat.members[numb] = item.toString()
            })
            chat.messages.forEach((item, numb) => {
                delete chat.messages[numb]._id
            })
        })
        return chats
    })()
}