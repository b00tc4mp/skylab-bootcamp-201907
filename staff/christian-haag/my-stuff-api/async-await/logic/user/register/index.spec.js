const { expect } = require('chai')
const logic = require('../../.')
const { User } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - register user', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name, surname, email, password

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
    })

    it('should succeed on correct data', async () => {

        const result = await logic.registerUser(name, surname, email, password)

        expect(result).to.exist

        const user = await User.findOne({ email })

        expect(user).to.exist
        expect(user.name).to.equal(name)
        expect(user.surname).to.equal(surname)
        expect(user.email).to.equal(email)
        expect(user.password).to.equal(password)

    })

    after(() => mongoose.disconnect())
})