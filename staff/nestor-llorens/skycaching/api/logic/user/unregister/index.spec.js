require('dotenv').config()

const { expect } = require('chai')
const logic = require('../.')
const { models: { User }, database } = require('data')

const { env: { DB_URL_TEST }} = process

describe('logic - unregister user', () => {

    let username, email, password, avatar

    username = `username-${Math.random()}`
    email = `email-${Math.random()}@domain.com`
    password = `password-${Math.random()}`
    avatar = `path-${Math.random()}`

    before(async() => {
        await database.connect(DB_URL_TEST)
            .then(() => User.deleteMany())

        const user = await User.create({ username, email, password, avatar })
        id = user.id
    })

    it('should fail on unexisting user', async () => {

        try {
            await logic.unregisterUser('123456789012', password)
        }
        catch (error) {
            expect(error.message).to.equal(`user with id 123456789012 not found`)
        }

    }
    )

    it('should fail on existing user, but wrong password', async() => {

        try {
            await logic.unregisterUser(id, 'wrongPassword')
        }
        catch (error) {
            expect(error.message).to.equal(`wrong credentials`)
        }
    })

    it('should succeed on correct data', async() => {
        const result = await logic.unregisterUser(id, password)
        expect(result).not.to.exist
        const user = await User.findOne({ _id: id })
        expect(user).not.to.exist
    })

    after(() => database.disconnect())
})