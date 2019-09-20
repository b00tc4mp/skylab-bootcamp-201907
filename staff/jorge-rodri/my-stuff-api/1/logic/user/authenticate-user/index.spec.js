const { expect } = require('chai')
const logic = require('..')
const { User } = require('../../../data')
const mongoose = require('mongoose')


describe('logic - authenticate user', () => {
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
        const _id = await logic.authenticateUser(email, password)
        debugger
        expect(_id).to.exist
        expect(_id).to.be.a('string')
        expect(_id).to.equal(id)
    })

    it('should error with email', async () => {

        try {

            await logic.authenticateUser("mira@ve.maribe", password)


        } catch (error) {

            expect(error.message).to.equal("user with e-mail mira@ve.maribe does not exist")

        }
    })

    it('should error with password', async () => {

        try {

            await logic.authenticateUser(email, "123")


        } catch (error) {

            expect(error.message).to.equal("wrong credentials")

        }
    })

    after(() => mongoose.disconnect())
})