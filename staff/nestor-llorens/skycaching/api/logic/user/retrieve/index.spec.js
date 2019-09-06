require('dotenv').config()

const { expect } = require('chai')
const logic = require('../.')
const { models: { User }, database } = require('data')

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve user', () => {

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

    it('should succeed on correct id', async() => {
        const user = await logic.retrieveUser(id)
            expect(user).to.exist
            expect(user.id).to.equal(id)
            expect(user._id)
            expect(user.username).to.equal(username)
            expect(user.email).to.equal(email)
            expect(user.password).not.to.exist
            expect(user.avatar).to.equal(avatar)
    
    })

    it('should fail on wrong id', async() =>{
        try{
            await logic.retrieveUser('123456789012')
        }catch(error) {
            expect(error.message).to.equal(`user with id 123456789012 not found`)
        }   
    })

        after(() => database.disconnect())
})