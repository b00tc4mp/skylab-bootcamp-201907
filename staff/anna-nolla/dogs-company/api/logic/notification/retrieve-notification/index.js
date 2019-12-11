const { validate } = require('utils')
const { models: { User } } = require('data')

/**
 * to retrieve all notifications that a user has
 * 
 * @param {string} id
 * 
 * @returns {Promise}
 * 
*/

module.exports = function(id) {
    
    validate.string(id, 'user id')
    

    return (async () => {        
        const user = await User.findById(id)
            if (!user) throw Error(`This user does not exist.`)
            if (user.notification.length === 0) throw Error(`This user does not have notifications`) 
        
        const notification = user.notification[0]
            notification.id = notification._id
            delete notification._id 
        return notification
    })()
}