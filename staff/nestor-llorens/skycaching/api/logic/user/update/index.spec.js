require('dotenv').config()

const { expect } = require('chai')
const logic = require('../.')
const { models: { User }, database } = require('data')

const { env: { DB_URL_TEST } } = process

describe('logic - update user', () => {
    before(async () => await database.connect(DB_URL_TEST))

    let username, password, email, avatar, id, body

    beforeEach(async () => {
        username = `username-${Math.random()}`
        password = `password-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        avatar = `avatar-${Math.random()}`

        body = {
            username: `username-${Math.random()}`,
            password: `password-${Math.random()}`,
            email: `email-${Math.random()}@domain.com`,
            avatar: `path-to-avatar-${Math.random()}`,
            extra: `extra-${Math.random()}`
        }
        
        await User.deleteMany()
        const user = await User.create({ username, password, email, avatar })
        id = user.id
    })

    it('should succeed on correct data', async () => {
        const result = await logic.updateUser(id, body)
        expect(result).not.to.exist
        const user = await User.findById(id)
        expect(user).to.exist
        expect(user.username).to.equal(body.username)
        expect(user.password).to.equal(body.password)
        expect(user.email).to.equal(body.email)
        expect(user.avatar).to.equal(body.avatar)
        expect(user.extra).not.to.exist
    })

    it('should fail on non-existing user', async () => {
        id = '123456789012'
        try {
            await logic.updateUser(id, body)

        } catch ({ message }) {
            expect(message).to.equal(`user with id ${id} not found`)
        }
    })

    it('should fail on empty id', () =>
        expect(() => logic.updateUser("", body)).to.throw('id is empty or blank')
    )

    it('should fail on wrong id type', () =>
        expect(() => logic.updateUser(123, body)).to.throw('id with value 123 is not a string')
    )

    after(() => database.disconnect())
})