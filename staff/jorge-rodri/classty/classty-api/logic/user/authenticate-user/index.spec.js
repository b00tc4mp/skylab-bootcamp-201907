require('dotenv').config()
debugger
const { expect } = require('chai')
const authenticateUser = require('.')
debugger
const { database, models: { User } } = require('data')
debugger
const { env: { DB_URL_TEST }} = process

describe('logic - authenticate user', () => {
    before(() => database.connect(DB_URL_TEST))

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
        const _id = await authenticateUser(email, password)
        debugger
        expect(_id).to.exist
        expect(_id).to.be.a('string')
        expect(_id).to.equal(id)
    })

    it('should error with email', async () => {

        try {

            await authenticateUser("mira@ve.maribe", password)


        } catch (error) {

            expect(error.message).to.equal("user with e-mail mira@ve.maribe does not exist")

        }
    })

    it('should error with password', async () => {

        try {

            await authenticateUser(email, "123")


        } catch (error) {

            expect(error.message).to.equal("wrong credentials")

        }
    })

    after(() => database.disconnect())
})