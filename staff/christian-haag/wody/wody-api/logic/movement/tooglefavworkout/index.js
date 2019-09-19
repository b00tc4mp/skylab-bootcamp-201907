const { validate } = require('wody-utils')
const { models: { User, Workout } } = require('wody-data')

/**
 * 
 * Toogles fav property. And pushes the object stored in 'current' into the 'historic' array.
 * 
 * If fav is set to true it upste's to false.
 * if fav is set to ture it update's to false.
 * 
 * @param {string} workoutId
 * @param {string} userId
 * 
 * @return {Promise}
 */

module.exports = function (workoutId, userId) {

    validate.string(workoutId, 'workoutId')
    validate.string(userId, 'userId')

    return (async () => {
        // 
        const workout = await Workout.findById(workoutId)
        const user = await User.findById(userId)

        if (!workout) throw new Error('workout does not exist')
        if (!user) throw new Error('user does not exist')

        if (user.current.length) {
            workout.fav = !workout.fav
            await user.save()
            user.historic.push(workout)
        } else {
            const wk = user.historic.find(w => w._id.toString() === workoutId)

            wk.fav = !wk.fav
        }

        if (user.current.length !== 0) user.current = []

        await user.save()

        return workoutId

    })()

}