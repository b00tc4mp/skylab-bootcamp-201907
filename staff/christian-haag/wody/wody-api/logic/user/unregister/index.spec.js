const { expect } = require('chai')
const logic = require('../../.')
const { models: { User } } = require('wody-data')
const { random, floor } = Math
const bcrypt = require('bcryptjs')
const { database } = require('wody-data')

describe('logic - unregister user', () => {
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
        const hash = await bcrypt.hash(password, 10)
        const user = await User.create({ name, surname, email, password: hash, gender, birthday, weight, height, goal, fitnesslevel })
        id = user.id
    })

    it('should fail on empty id', () =>
        expect(() =>
            logic.unregisterUser('', password)
        ).to.throw('id is empty or blank')
    )

    it('should fail on undefined id', () =>
        expect(() =>
            logic.unregisterUser(undefined, password)
        ).to.throw(`id with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.unregisterUser(123456798, password)
        ).to.throw(`id with value 123456798 is not a string`)
    )

    it('should fail on empty password', () =>
        expect(() =>
            logic.unregisterUser(id, '')
        ).to.throw('password is empty or blank')
    )

    it('should fail on undefined password', () =>
        expect(() =>
            logic.unregisterUser(id, undefined)
        ).to.throw(`password with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.unregisterUser(id, 123456798)
        ).to.throw(`password with value 123456798 is not a string`)
    )


    it('should succeed on correct data', async () => {
        await logic.unregisterUser(id, password)

        const user = await User.findById({ _id: id })

        expect(user).to.not.exist

    })

    it('should fail on unexisting user', async () => {
        try {
            await logic.unregisterUser('5d5d5530531d455f75da9fF9', password)
        } catch ({ message }) {
            expect(message).to.equal('wrong credentials')
        }
    })

    it('should fail on existing user, but wrong password', async () => {
        try {
            await logic.unregisterUser(id, 'wrong-password')
        } catch ({ message }) {
            expect(message).to.equal('wrong credentials')

        }
    })

    after(() => database.disconnect())
})