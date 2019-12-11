const { validate } = require('wody-utils')
const { models: { User, Workout } } = require('wody-data')

/**
 * Retrieves favorite workouts from users workout history
 * 
 * @param {string} userId
 * 
 * @returns {Promise}
 * 
 */

module.exports = function (userId) {

    validate.string(userId, 'userId')

    return (async () => {
        //find user
        const user = await User.findById(userId)

        if (!user) throw new Error('user does not exist')

        const favWorkouts = user.historic.filter(item => item.fav === true)

        return favWorkouts

    })()
}