const { validate } = require('utils')
const { models: { User, Notification } } = require('data')

/**
 * Create a user notification visible for all
 * 
 * @param {String} id 
 * @param {String} title
 * @param {String} text
 * 
 * @returns {Promise}
 */

module.exports = function (id, title, text) {
    validate.string(id, 'user id')
    validate.string(title, 'title')
    validate.string(text, 'text')

    return (async () => {
        const user = await User.findById(id)
            if (!user) throw Error('User does not exists.')
            if (user.notification.length > 0) throw Error('Notification already exists')

        const newNotification = new Notification({ 'title': title, 'text': text })
            notificationId = newNotification._id
            user.notification.push(newNotification)
            await user.save()
            return notificationId
    })()
}    