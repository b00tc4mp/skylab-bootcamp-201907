const { expect } = require('chai')
const logic = require('../..')
const { models: { User, Workout } } = require('wody-data')
const { random, floor } = Math
const { database } = require('wody-data')

describe('logic- endWorkout', () => {
    before(() => database.connect('mongodb://localhost/wody-server-test', { useNewUrlParser: true }))

    let name, surname, email, password, gender, birthday, weight, height, goal, fitnesslevel, userId, workoutId

    let genderRandom = ['male', 'female']
    let fitnessLvlRandom = ['low', 'mid', 'high']
    let goalRandom = ['lose', 'fit', 'gain']
    let rand = (param) => floor(random() * param.length)

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@domain.com`
        password = `password-${random()}`
        gender = genderRandom[rand(genderRandom)]
        fitnesslevel = fitnessLvlRandom[rand(fitnessLvlRandom)]
        goal = goal = goalRandom[rand(goalRandom)]
        birthday = '29/06/1984'
        weight = floor(random() * ((130 - 50) + 1) + 50)
        height = floor(random() * ((215 - 50) + 1) + 50)

        await User.deleteMany()
        await Workout.deleteMany()
        const user = await logic.registerUser(name, surname, email, password, gender, birthday, weight, height, goal, fitnesslevel)
        userId = user.id
        workoutId = await logic.calculateWorkout(userId)
    })

    it('should fail on empty workoutId', () =>
        expect(() =>
            logic.endWorkout('', userId)
        ).to.throw('workoutId is empty or blank')
    )

    it('should fail on undefined workoutId', () =>
        expect(() =>
            logic.endWorkout(undefined, userId)
        ).to.throw(`workoutId with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.endWorkout(123456798, userId)
        ).to.throw(`workoutId with value 123456798 is not a string`)
    )

    it('should fail on empty userId', () =>
        expect(() =>
            logic.endWorkout(workoutId, '')
        ).to.throw('userId is empty or blank')
    )

    it('should fail on undefined userId', () =>
        expect(() =>
            logic.endWorkout(workoutId, undefined)
        ).to.throw(`userId with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.endWorkout(workoutId, 123456798)
        ).to.throw(`userId with value 123456798 is not a string`)
    )

    it('should fail if workout not exist', async () => {
        try {
            await logic.endWorkout('5d5d5530531d455f75da9fF9', userId)
        } catch ({ message }) {
            expect(message).to.equal('workout does not exist')
        }
    })

    it('should fail if user not exist', async () => {
        try {
            await logic.endWorkout(workoutId, '5d5d5530531d455f75da9fF9')
        } catch ({ message }) {
            expect(message).to.equal('user does not exist')
        }
    })

    it('should push current workout to historic', async () => {
        const user = await User.findById(userId)

        const { current, historic } = user
        expect(current.length).to.equal(1)
        expect(historic.length).to.equal(0)

        await logic.endWorkout(workoutId, userId)

        const _user = await User.findById(userId)

        expect(_user.current.length).to.equal(0)
        expect(_user.historic.length).to.equal(1)

    })

    after(() => database.disconnect())
})