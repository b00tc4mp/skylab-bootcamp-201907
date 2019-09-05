// TODO

// const { validate } = require('utils')
// const { models: { User, Chat } } = require('data')

// /**
//  * Create a chat with another user
//  * 
//  * @param {String} id 
//  * @param {String} participantId
//  * 
//  * @returns {Promise}
//  */

// module.exports = function (id, chatId) {
//     validate.string(id, 'user id')
//     validate.string(chatId, 'chat id')

//     return (async () => {
//         const user = await User.findById(id)
//         if (!user) throw Error('User does not exists.')

//         const chat = await Chat.findById(chatId)
//         if (!chat) throw Error('Chat does not exists.')
//         if (chat.delete.lenght = 0) {
//             chat.delete.push(id)
//             await chat.save()
//             return chatId
//         }
        



//         const chat_ = await Chat.findOne({ participants: [id, participantId] })
//         if (chat_) throw Error('chat already exists')

//         const chat = await Chat.create({ participants: [id, participantId] })
//         return chat._id.toString()
//     })()
// } 