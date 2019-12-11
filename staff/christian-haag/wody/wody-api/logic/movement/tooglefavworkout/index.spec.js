const { expect } = require('chai')
const logic = require('../..')
const { models: { User, Workout } } = require('wody-data')
const { random, floor } = Math
const { database } = require('wody-data')


describe('logic- favWorkout', () => {
    before(() => database.connect('mongodb://localhost/wody-server-test', { useNewUrlParser: true }))


    describe('logic - check favWorkout Enviorment.', () => {

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
            repassword = password
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
                logic.favWorkout('', userId)
            ).to.throw('workoutId is empty or blank')
        )

        it('should fail on undefined workoutId', () =>
            expect(() =>
                logic.favWorkout(undefined, userId)
            ).to.throw(`workoutId with value undefined is not a string`)
        )

        it('should fail on wrong data type', () =>
            expect(() =>
                logic.favWorkout(123456798, userId)
            ).to.throw(`workoutId with value 123456798 is not a string`)
        )

        it('should fail if workout not exist', async () => {
            try {
                await logic.favWorkout('5d5d5530531d455f75da9fF9', userId)
            } catch ({ message }) {
                expect(message).to.equal('workout does not exist')
            }
        })

        it('should fail on empty userId', () =>
            expect(() =>
                logic.favWorkout(workoutId, '')
            ).to.throw('userId is empty or blank')
        )

        it('should fail on undefined userId', () =>
            expect(() =>
                logic.favWorkout(workoutId, undefined)
            ).to.throw(`userId with value undefined is not a string`)
        )

        it('should fail on wrong data type', () =>
            expect(() =>
                logic.favWorkout(workoutId, 123456798)
            ).to.throw(`userId with value 123456798 is not a string`)
        )

        it('should fail if workout not exist', async () => {
            try {
                await logic.favWorkout('5d5d5530531d455f75da9fF9', userId)
            } catch ({ message }) {
                expect(message).to.equal('workout does not exist')
            }
        })

        it('should fail if user not exist', async () => {
            try {
                await logic.favWorkout(workoutId, '5d5d5530531d455f75da9fF9')
            } catch ({ message }) {
                expect(message).to.equal('user does not exist')
            }
        })

        it('should set to True', async () => {
            await logic.favWorkout(workoutId, userId)

            const user = await User.findById(userId).lean()
            debugger
            expect(user).to.exist

            const { historic: { 0: { fav } } } = user

            expect(fav).to.true

        })

        it('should set fav to false', async () => {
            await Workout.findByIdAndUpdate(workoutId, { $set: { fav: true } }, { useFindAndModify: false })
            await logic.favWorkout(workoutId, userId)
            const user = await User.findById(userId).lean()

            expect(user).to.exist

            const { historic: { 0: { fav } } } = user

            expect(fav).to.false
        })


    })

    after(() => database.disconnect())

})