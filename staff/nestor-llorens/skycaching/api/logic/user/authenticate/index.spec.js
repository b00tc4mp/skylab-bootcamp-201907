require('dotenv').config()

const { expect } = require('chai')
const logic = require('../.')
const { models: { User }, database } = require('data')

const { env: { DB_URL_TEST } } = process

describe('logic - authenticate user', () => {
    
    before(async() => await database.connect(DB_URL_TEST))

    let username, password, email, avatar, id

    beforeEach(async () => {
        username = `username-${Math.random()}`
        password = `password-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        avatar = `path-to-avatar-${Math.random()}`

        await User.deleteMany()
        const user = await User.create({ username, password, email, avatar })
        id = user.id
    })

    it('should succeed on correct data', async () => {
        const _id = await logic.authenticateUser(username, password)
        expect(_id).to.exist
        expect(_id).to.be.a('string')
        expect(_id).to.equal(id)
    })

    it('should fail on wrong email', async () => {
        email = "wrongemail@mail.com"

        try {
            await logic.authenticateUser(username, password)

        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal('user with e-mail wrongemail@mail.com does not exist')
        }
    })

    it('should fail on wrong password', async () => {
        password = 'wrongpassword'

        try {
            await logic.authenticateUser(username, password)

        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal('wrong credentials')
        }
    })

    it('should fail on empty email', () =>
        expect(() => logic.authenticateUser("", password)).to.throw('username is empty or blank')
    )

    // it('should fail on wrong email type', () =>
    //     expect(() => logic.authenticateUser("wrong_email", password)).to.throw('email with value wrong_email is not a valid e-mail')
    // )

    it('should fail on wrong password type', () =>
        expect(() => logic.authenticateUser(12345, password)).to.throw('username with value 12345 is not a string')
    )

    it('should fail on empty password', () =>
        expect(() => logic.authenticateUser(email, "")).to.throw('password is empty or blank')
    )

    it('should fail on wrong password type', () =>
        expect(() => logic.authenticateUser(email, 12345)).to.throw('password with value 12345 is not a string')
    )

    after(() => database.disconnect())
})