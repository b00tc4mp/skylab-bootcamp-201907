const { expect } = require('chai')
const logic = require('../../.')
const { User } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - unregister user', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name, surname, email, password, id

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
        const user = await User.create({ name, surname, email, password })
        id = user.id
    })

    it('should succeed on correct data', async () => {
        const result = await logic.unregisterUser(id, password)

        expect(result).not.to.exist


        const user = await User.findById(id)

        expect(user).not.to.exist

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

    after(() => mongoose.disconnect())
})