const { validate } = require('wannadog-utils')
const { models } = require('wannadog-data')
const { User, Wish } = models

/**
 *  Unregisters wish
 * 
 * @param {string} id 
 * @param {string} wishId
 * 
 * @returns {Promise}
*/

module.exports = function (id, wishId) {

    validate.string(id, 'user id')
    validate.string(wishId, 'wish id')

    return (async () => {

        const user = await User.findById(id)
        if (!user) throw Error('User does not exist.')

        if (!(await Wish.findById(wishId))) throw Error('Wish does not exist.')

        await Wish.deleteOne({ _id: wishId })

        if ((user.wishes.findIndex(element => element.id === wishId) > -1)) {
            user.wishes.splice(user.wishes.findIndex(element => element.id === wishId), 1)
        } else { throw Error('User does not have that wish') }

        await user.save()
    })()
}