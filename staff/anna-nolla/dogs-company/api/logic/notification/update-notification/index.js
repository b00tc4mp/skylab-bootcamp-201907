const { validate } = require('utils')
const { models: { User } } = require('data')

/**
 * Update a user notification
 * 
 * @param {String} id 
 * @param {String} notificationId
 * @param {String} data
 * 
 * @returns {Promise}
 */

module.exports = function (id, notificationId, data) {
    validate.string(id, 'user id')
    validate.string(notificationId, 'notification id')
    validate.string(data.title, 'title')
    validate.string(data.text, 'text')

    return (async () => {
       
        let user = await User.findById(id)
            if (!user) throw Error('User does not exists.')
            if (user.notification.length < 0) throw Error('This user does not have notifications')
    
        let notIndex = await user.notification.findIndex(item => item.id === notificationId)
           if (notIndex === -1) throw Error("This user has no notifications")

            user.notification[notIndex] = data
            user.notification[notIndex]._id = notificationId
    
        // await User.update({ "id": id, "notification.id": notificationId}, { "$set": { "notification.0.title": data.title }})
        await user.save()
    })()
}    