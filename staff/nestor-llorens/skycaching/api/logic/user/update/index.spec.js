require('dotenv').config()

const { expect } = require('chai')
const logic = require('../.')
const { models: { User }, database } = require('data')

const { env: { DB_URL_TEST }} = process

describe('logic - update user', () => {

    let username, email, password, avatar

    username = `username-${Math.random()}`
    email = `email-${Math.random()}@domain.com`   
    password = `password-${Math.random()}@domain.com`
    avatar = `path-${Math.random()}`

    body = {
        username: `username-${Math.random()}`,
        email: `email-${Math.random()}@domain.com`,
        password: `password-${Math.random()}@domain.com`,
        avatar: `path-${Math.random()}`,
    }

    before(async() => {
        await database.connect(DB_URL_TEST)
            .then(() => User.deleteMany())

        const user = await User.create({ username, email, password, avatar })
        id = user.id
    })

    it('should succeed on correct data', async() => {
        const result = await logic.updateUser(id, body)
        expect(result).not.to.exist
        const user = await User.findById(id)
        debugger
        
        expect(user).to.exist
        expect(user.username).to.equal(body.username)
        expect(user.email).to.equal(body.email)
        expect(user.password).to.equal(body.password)
        expect(user.avatar).to.equal(body.avatar)
        
    })
            

    it('should fail on non-existing user', async() => {
    
        try {
            await logic.updateUser('123456789012', body)
        } catch(error) {
            expect(error.message).to.equal(`user with id 123456789012 not found`)
        }
    })

    after(() => database.disconnect())
})