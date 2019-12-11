const { expect } = require('chai')
const logic = require('../..')
const { models: { User, Workout, Movement } } = require('wody-data')
const { random, floor } = Math
const { database } = require('wody-data')

describe('logic - calculate workout', () => {
    before(() => database.connect('mongodb://localhost/wody-server-test', { useNewUrlParser: true }))

    let name, surname, email, password, gender, birthday, weight, height, goal, fitnesslevel, id

    // let genderRandom = ['male', 'female']
    // let fitnessLvlRandom = ['low', 'mid', 'high']
    // let goalRandom = ['lose', 'fit', 'gain']
    // let rand = (param) => floor(random() * param.length)

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@domain.com`
        password = `password-${random()}`
        gender = 'male'
        fitnesslevel = 'low'
        goal = goal = 'lose'
        birthday = '29/06/1984'
        weight = floor(random() * ((130 - 50) + 1) + 50)
        height = floor(random() * ((215 - 50) + 1) + 50)

        await User.deleteMany()
        const user = await logic.registerUser(name, surname, email, password, gender, birthday, weight, height, goal, fitnesslevel)
        id = user.id
    })

    it('should fail on empty id', () =>
        expect(() =>
            logic.calculateWorkout('')
        ).to.throw('id is empty or blank')
    )

    it('should fail on undefined id', () =>
        expect(() =>
            logic.calculateWorkout(undefined)
        ).to.throw(`id with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.calculateWorkout(123456798)
        ).to.throw(`id with value 123456798 is not a string`)
    )

    it('should fail if user not exist', async () => {
        try {
            await logic.calculateWorkout('5d5d5530531d455f75da9fF9')
        } catch ({ message }) {
            expect(message).to.equal('user does not exist')
        }
    })


    it('should have empty "current" property', async () => {
        const user = await User.findById(id)
        const { current } = user
        expect(current.length).to.equal(0)

    })

    it('should return workout', async () => {
        const workoutId = await logic.calculateWorkout(id)
        const workout = await Workout.findById(workoutId)
        expect(workout).to.exist
        const { sets, date, movements } = workout

        expect(sets).to.exist
        expect(date).to.exist
        expect(movements).to.exist
        expect(movements).to.be.an('array')
        expect(movements.length).to.equal(5)

        movements.forEach(item => {
            expect(item).to.have.all.keys('_id', 'movement', 'type', 'difficulty', 'restime', 'bord', 'gender', 'goal', 'fitnesslevel', 'weights', 'reps', 'url')
            expect(item.movement).to.be.a('string')
            expect(item.type).to.be.a('string')
            expect(item.difficulty).to.be.a('number')
            expect(item.restime).to.be.a('number')
            expect(item.bord).to.be.a('string')
            expect(item.gender).to.be.a('string')
            expect(item.gender).to.equal('male')
            expect(item.goal).to.be.a('string')
            expect(item.goal).to.equal('lose')
            expect(item.fitnesslevel).to.be.a('string')
            expect(item.fitnesslevel).to.equal('low')
            expect(item.weights).to.be.a('string')
            expect(item.url).to.be.a('string')
        })

    })


    it('should NOT have empty "current" property', async () => {
        await logic.calculateWorkout(id)
        const user = await User.findById(id)
        const { current } = user

        expect(current.length).to.equal(1)
    })

    describe('logic - User cases', () => {
        describe('CASE 1', () => {

            let name, surname, email, password, gender, birthday, weight, height, goal, fitnesslevel, id

            let genderRandom = ['male', 'female']
            let fitnessLvlRandom = ['low', 'mid', 'high']
            let goalRandom = ['lose', 'fit', 'gain']
            let rand = (param) => floor(random() * param.length)

            beforeEach(async () => {
                name = `case1-${random()}`
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
                const user = await logic.registerUser(name, surname, email, password, gender, birthday, weight, height, goal, fitnesslevel)
                id = user.id
            })

            it('should filter workout by user level - CASE 1', async () => {
                const workoutId = await logic.calculateWorkout(id)
                const workout = await Workout.findById(workoutId)
                const { movements } = workout
                movements.forEach(items => {
                    expect(items.goal).to.equal(goal)
                    expect(items.gender).to.equal(gender)
                    expect(items.fitnesslevel).to.equal(fitnesslevel)
                })
            })
        })


        describe('CASE 2', () => {

            let name, surname, email, password, gender, birthday, weight, height, goal, fitnesslevel, id

            let genderRandom = ['male', 'female']
            let fitnessLvlRandom = ['low', 'mid', 'high']
            let goalRandom = ['lose', 'fit', 'gain']
            let rand = (param) => floor(random() * param.length)

            beforeEach(async () => {
                name = `case2-${random()}`
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

                const user = await logic.registerUser(name, surname, email, password, gender, birthday, weight, height, goal, fitnesslevel)
                id = user.id
            })


            it('should filter workout by user level - CASE 2', async () => {
                const workoutId = await logic.calculateWorkout(id)
                const workout = await Workout.findById(workoutId)
                const { movements } = workout
                movements.forEach(items => {
                    expect(items.goal).to.equal(goal)
                    expect(items.gender).to.equal(gender)
                    expect(items.fitnesslevel).to.equal(fitnesslevel)
                })
            })

        })

    })
    after(() => database.disconnect())
})
