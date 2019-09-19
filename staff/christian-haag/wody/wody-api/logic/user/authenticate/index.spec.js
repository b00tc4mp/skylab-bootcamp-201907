const { expect } = require('chai')
const logic = require('../../.')
const { models: { User } } = require('wody-data')
const { random, floor } = Math
const bcrypt = require('bcryptjs')
const { database } = require('wody-data')


describe('logic - authenticate user', () => {
    before(() => database.connect('mongodb://localhost/wody-server-test', { useNewUrlParser: true }))

    let name, surname, email, password, gender, birthday, weight, height, goal, fitnesslevel, id

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
        goal = goalRandom[rand(goalRandom)]
        birthday = '29/06/1984'
        weight = floor(random() * ((130 - 50) + 1) + 50)
        height = floor(random() * ((215 - 50) + 1) + 50)

        await User.deleteMany()
        const hash = await bcrypt.hash(password, 10)
        const user = await User.create({ name, surname, email, password: hash, gender, birthday, weight, height, goal, fitnesslevel })
        id = user.id
    })

    //email
    it('should fail on wrong format', () =>
        expect(() =>
            logic.authenticateUser(123456798, password)
        ).to.throw('email with value 123456798 is not a valid e-mail')
    )

    //password
    it('should fail on empty password', () =>
        expect(() =>
            logic.authenticateUser(email, '')
        ).to.throw('password is empty or blank')
    )

    it('should fail on undefined password', () =>
        expect(() =>
            logic.authenticateUser(email, undefined)
        ).to.throw(`password with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.authenticateUser(email, 123456798)
        ).to.throw(`password with value 123456798 is not a string`)
    )

    it('should succeed on correct data', async () => {
        const _id = await logic.authenticateUser(email, password)

        expect(_id).to.exist
        expect(_id).to.be.a('string')
        expect(_id).to.equal(id)
    })


    it('should fail on non existing email', async () => {
        const fakeMail = 'tedoy@conelMechero.sole'
        try {
            await logic.authenticateUser(fakeMail, password)
        } catch ({ message }) {
            expect(message).to.equal('wrong credentials')
        }
    })

    it('should fail on non existing password', async () => {
        const fakePass = '16519616'
        try {
            await logic.authenticateUser(email, fakePass)
        } catch ({ message }) {
            expect(message).to.equal('wrong credentials')
        }
    })

    after(() => database.disconnect())
})