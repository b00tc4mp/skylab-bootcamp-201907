require('dotenv').config()

const { expect } = require('chai')
const logic = require('../.')
const { models: { User }, database } = require('data')

const { env: { DB_URL_TEST } } = process

describe('logic - unregister user', () => {
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
        const result = await logic.unregisterUser(id, password)
        expect(result).not.to.exist
        const user = await User.findById(id)
        expect(user).not.to.exist
    })

    it('should fail on unexisting user', async () => {
        try {
            await logic.unregisterUser('123456789012', password)
        } catch ({ message }) {
            expect(message).to.equal('user with id 123456789012 not found')
        }
    })

    it('should fail on existing user, but wrong password', async () => {
        try {
            await logic.unregisterUser(id, 'wrong-password')
        } catch ({ message }) {
            expect(message).to.equal('wrong credentials')
        }
    })

    it('should fail on empty id', () =>
        expect(() => logic.unregisterUser("", password)).to.throw('id is empty or blank')
    )

    it('should fail on wrong id type', () =>
        expect(() => logic.unregisterUser(12345, password)).to.throw('id with value 12345 is not a string')
    )

    it('should fail on empty password', () =>
        expect(() => logic.unregisterUser(id, "")).to.throw('password is empty or blank')
    )

    it('should fail on wrong password type', () =>
        expect(() => logic.unregisterUser(id, 12345)).to.throw('password with value 12345 is not a string')
    )

    after(() => database.disconnect())
})