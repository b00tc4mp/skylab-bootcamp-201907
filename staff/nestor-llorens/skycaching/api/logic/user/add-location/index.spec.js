require('dotenv').config()

const { expect } = require('chai')
const logic = require('../.')
const { models: { User }, database } = require('data')

const { env: { DB_URL_TEST } } = process

describe('logic - add location user', () => {
    
    before(async() => await database.connect(DB_URL_TEST))

    let username, password, email, avatar, id

    beforeEach(async () => {
        username = `username-${Math.random()}`
        password = `password-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        avatar = `path-to-avatar-${Math.random()}`

        location = [87, 23]

        await User.deleteMany()
        const user = await User.create({ username, password, email, avatar })
        id = user.id
    })

    it('should succeed on correct data', async () => {
        await logic.addLocation(id, location)

        user = await User.findById(id)

        expect(user).to.exist
        expect(user.location.coordinates).to.deep.equal(location)
    })

    after(() => database.disconnect())
})