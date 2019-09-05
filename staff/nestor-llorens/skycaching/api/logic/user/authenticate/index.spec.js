require('dotenv').config()

const { expect } = require('chai')
const logic = require('../.')
const { models: { User }, database } = require('data')

const { env: { DB_URL_TEST }} = process

describe.only('logic - authenticate user', () => {

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

    it('should succeed on correct data', async() => {
        const _id = await logic.authenticateUser(email, password)
        
        expect(_id).to.exist
        expect(_id).to.be.a('string')
        expect(_id).to.equal(id)
    })
        

    it('should fail on wrong email', async() => {
        
        try {
            await logic.authenticateUser('wrongEmail@ddd.com', password)
        }
        catch (error) {
            expect(error.message).to.equal('user with e-mail wrongEmail@ddd.com does not exist')
        }
        
    })

    it('should fail on wrong password', async() => {
        try {
            await logic.authenticateUser(email, 'wrongPassword')
        }
        catch (error) {
            expect(error.message).to.equal('wrong credentials')
        }
    })

    after(() => database.disconnect())
})