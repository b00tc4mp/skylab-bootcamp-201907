
const { expect } = require('chai')
const logic = require('../..')
const { models: { User, Workout } } = require('wody-data')
const mongoose = require('mongoose')
const { random, floor } = Math
const { database } = require('wody-data')


describe('logic- favWorkout', () => {
    before(() => mongoose.connect('mongodb://localhost/wody-server-test', { useNewUrlParser: true }))
    describe('logic - check favWorkout function', () => {

        let name1, surname1, email1, password1, gender1, birthday1, weight1, height1, goal1, fitnesslevel1, userId1, workoutId1


        let genderRandom = ['male', 'female']
        let fitnessLvlRandom = ['low', 'mid', 'high']
        let goalRandom = ['lose', 'fit', 'gain']
        let rand = (param) => floor(random() * param.length)

        beforeEach(async () => {
            name1 = `name-${random()}`
            surname1 = `surname-${random()}`
            email1 = `email-${random()}@domain.com`
            password1 = `password-${random()}`
            gender1 = genderRandom[rand(genderRandom)]
            fitnesslevel1 = fitnessLvlRandom[rand(fitnessLvlRandom)]
            goal1 = goalRandom[rand(goalRandom)]
            birthday1 = '29/06/1984'
            weight1 = floor(random() * ((130 - 50) + 1) + 50)
            height1 = floor(random() * ((215 - 50) + 1) + 50)


            const user1 = await logic.registerUser(name1, surname1, email1, password1, gender1, birthday1, weight1, height1, goal1, fitnesslevel1)
            userId1 = user1.id
            workoutId1 = await logic.calculateWorkout(userId1)
            await logic.favWorkout(workoutId1, userId1)

            workoutId2 = await logic.calculateWorkout(userId1)
            await logic.endWorkout(workoutId2, userId1)

            workoutId3 = await logic.calculateWorkout(userId1)
            await logic.favWorkout(workoutId3, userId1)

        })

        it('should fail on empty userId', () =>
            expect(() =>
                logic.retrieveFavWorkout('')
            ).to.throw('userId is empty or blank')
        )

        it('should fail on undefined userId', () =>
            expect(() =>
                logic.retrieveFavWorkout(undefined)
            ).to.throw(`userId with value undefined is not a string`)
        )

        it('should fail on wrong data type', () =>
            expect(() =>
                logic.retrieveFavWorkout(123456798)
            ).to.throw(`userId with value 123456798 is not a string`)
        )

        it('should fail if user not exist', async () => {
            try {
                await logic.retrieveFavWorkout('5d5d5530531d455f75da9fF9')
            } catch ({ message }) {
                expect(message).to.equal('user does not exist')
            }
        })

        it('should return fav workouts', async () => {
            const favWorkouts = await logic.retrieveFavWorkout(userId1)
            expect(favWorkouts).to.exist

            expect(favWorkouts.length).to.equal(2)

            expect(favWorkouts[0].fav).to.true
            expect(favWorkouts[1].fav).to.true

        })
    })

    after(() => database.disconnect())
})