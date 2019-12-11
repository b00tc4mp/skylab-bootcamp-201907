const { expect } = require('chai')
const logic = require('../../.')
const { models: { User } } = require('wody-data')
const { random, floor } = Math
const { database } = require('wody-data')

describe('logic - retrieve user', () => {
    before(() => database.connect('mongodb://localhost/wody-server-test', { useNewUrlParser: true }))

    let name, surname, email, password, repassword, gender, birthday, weight, height, goal, fitnesslevel, id

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
        goal = goalRandom[rand(goalRandom)]
        birthday = '29/06/1984'
        weight = floor(random() * ((130 - 50) + 1) + 50)
        height = floor(random() * ((215 - 50) + 1) + 50)

        await User.deleteMany()
        const user = await User.create({ name, surname, email, password, repassword, gender, birthday, weight, height, goal, fitnesslevel })
        id = user.id
    })

    it('should fail on empty id', () =>
        expect(() =>
            logic.retrieveUser('')
        ).to.throw('id is empty or blank')
    )

    it('should fail on undefined id', () =>
        expect(() =>
            logic.retrieveUser(undefined)
        ).to.throw(`id with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.retrieveUser(123456798)
        ).to.throw(`id with value 123456798 is not a string`)
    )

    it('should fail if user not exist', async () => {
        try {
            await logic.retrieveUser('5d5d5530531d455f75da9fF9')
        } catch ({ message }) {
            expect(message).to.equal('user with id 5d5d5530531d455f75da9fF9 not found')
        }
    })

    it('should succeed on correct data', async () => {
        const user = await logic.retrieveUser(id)

        expect(user).to.exist
        expect(user.id).to.equal(id)
        expect(user._id).not.to.exist
        expect(user.name).to.equal(name)
        expect(user.surname).to.equal(surname)
        expect(user.email).to.equal(email)
        expect(user.password).not.to.exist
        expect(user.gender).to.equal(gender)
        expect(user.birthday).to.equal(birthday)
        expect(user.weight).to.equal(weight)
        expect(user.height).to.equal(height)
        expect(user.fitnesslevel).to.equal(fitnesslevel)
        expect(user.goal).to.equal(goal)

    })

    after(() => database.disconnect())
})