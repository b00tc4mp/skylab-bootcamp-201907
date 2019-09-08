const { validate } = require('utils')
const { models: { User } } = require('data')

/**
 * Unregisters a pet through the id and the pet id
 * 
 * @param {string} id 
 * @param {string} notificationId
 * 
 * @returns {Promise}
*/

module.exports = function(id, notificationId) {

    validate.string(id, 'user id')
    validate.string(notificationId, 'notification id')

    return (async () => {
        const user = await User.findById(id)
            if(!user) throw Error('There is no user with this id')
         
        const notification = user.notification.findIndex(index => index._id === notificationId)
            if(notification.length === 0) throw Error('This notification is not from this owner')        
        user.notification.splice(notification, 1)
        user.save()
    })()
}