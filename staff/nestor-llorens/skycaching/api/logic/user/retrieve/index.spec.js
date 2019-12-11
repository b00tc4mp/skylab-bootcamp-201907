require('dotenv').config()

const { expect } = require('chai')
const logic = require('../.')
const { models: { User }, database } = require('data')

const { env: { DB_URL_TEST } } = process

describe('logic - retrieve user', () => {
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
        const user = await logic.retrieveUser(id)
        expect(user).to.exist
        debugger
        expect(user.id).to.equal(id)
        expect(user._id).not.to.exist
        expect(user.username).to.equal(username)
        expect(user.email).to.equal(email)
        expect(user.avatar).to.equal(avatar)
        expect(user.password).not.to.exist
    })
    it('should throw an error with a wrong id', async () => {
        try {
            await logic.retrieveUser("123456789012")

        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`user with id 123456789012 not found`)
        }
    })

    it('should fail on empty id', () =>
        expect(() => logic.retrieveUser("")).to.throw('id is empty or blank')
    )

    it('should fail on wrong id type', () =>
        expect(() => logic.retrieveUser(123)).to.throw('id with value 123 is not a string')
    )
    after(() => database.disconnect())
})