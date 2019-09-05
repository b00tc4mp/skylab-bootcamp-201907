require('dotenv').config()

const { expect } = require('chai')
const logic = require('../.')
const { models: { User }, database } = require('data')

const { env: { DB_URL_TEST }} = process

describe('logic - register user', () => {

    let username, email, password, avatar

    username = `username-${Math.random()}`
    email = `email-${Math.random()}@domain.com`
    password = `password-${Math.random()}`
    avatar = `path-${Math.random()}`

    before(async() => {
        await database.connect(DB_URL_TEST)
            .then(() => User.deleteMany())
    })

    it('should succeed on correct data', async() => {
        
        const result = await logic.registerUser(username, email, password, avatar)
        expect(result).not.to.exist
        
        const user = await User.findOne({ email })
        expect(user).to.exist
        expect(user.username).to.equal(username)
        expect(user.email).to.equal(email)
        expect(user.password).to.equal(password)
        expect(user.avatar).to.equal(avatar)        
    })

    it('should fail on existing email', async() => {
        try{
            await logic.registerUser(username, email, password, avatar)
            
        }
        catch(error){
            expect(error.message).to.equal(`user with e-mail ${email} already exists`)

        }        
    })

    after(() => database.disconnect())
})