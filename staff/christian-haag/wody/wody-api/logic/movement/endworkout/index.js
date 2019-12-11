const { validate } = require('wody-utils')
const { models: { User, Workout } } = require('wody-data')



module.exports = function (workoutId, userId) {

    validate.string(workoutId, 'workoutId')
    validate.string(userId, 'userId')

    return (async () => {

        const workout = await Workout.findById(workoutId)

        const user = await User.findById(userId)

        if (!workout) throw new Error('workout does not exist')

        if (!user) throw new Error('user does not exist')

        user.historic.push(workout)

        if (user.current.length != 0) user.current = []

        await workout.save()
        await user.save()

        return workoutId
    })()
}