const { validate, randomator } = require('wody-utils')
const { models: { User, Movement, Workout } } = require('wody-data')
/**
 * Returns movements following users profile queries
 * 
 * @param {string} id
 * 
 * @returns {Promise}
 */

module.exports = function (id) {

    validate.string(id, 'id')

    return (async () => {
        //find user
        const user = await User.findById(id)

        if (!user) throw new Error('user does not exist')
        //destructure needed queries
        const { gender, goal, fitnesslevel } = user
        //find movement that match with queries
        const movements = await Movement.find({ gender: gender, goal: goal, fitnesslevel: fitnesslevel }).lean()

        const movementsClone = [...movements]

        //order result randomly in array
        let selectRandomMovement = randomator(movementsClone)
        //keep only the first 5 array values
        selectRandomMovement.splice(5)

        selectRandomMovement.id = selectRandomMovement._id
        delete selectRandomMovement._id
        //choose One rep option
        selectRandomMovement.forEach(movement => {
            const { reps } = movement

            if (reps == '') return

            randomator(reps)

            reps.splice(1)
        })

        //choose set option
        const set = ['AMRAP', '3 rounds', '4 rounds', 'For Time']
        let randomSet = randomator(set)
        randomSet.splice(1)
        //create Workout instance
        const workoutOfTheDay = new Workout({ sets: randomSet, movements: selectRandomMovement })

        if (user.current.length >= 1) user.current.pop()

        user.current.push(workoutOfTheDay)

        await user.save()
        await workoutOfTheDay.save()

        return workoutOfTheDay.id
    })()

}