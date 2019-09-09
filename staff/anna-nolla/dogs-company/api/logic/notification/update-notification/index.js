const { validate } = require('utils')
const { models: { User, Notification } } = require('data')

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
    
        let notification = await user.notification.find(item => item.id === notificationId)
           if (!notification) throw Error("This user has no notifications")

            notification.title = data.title
            notification.text = data.text
            
        await user.save()
    })()
}    