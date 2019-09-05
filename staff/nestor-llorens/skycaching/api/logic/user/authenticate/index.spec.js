const { expect } = require('chai')
const logic = require('../.')
const { User } = require('../../../../data')
const mongoose = require('mongoose')

describe.only('logic - authenticate user', () => {

    let name, surname, email, password

    name = `name-${Math.random()}`
    surname = `surname-${Math.random()}`
    email = `email-${Math.random()}@domain.com`
    password = `password-${Math.random()}`

    before(async() => {
        await mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true })
            .then(() => User.deleteMany())


        const user = await User.create({ name, surname, email, password })
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

    after(() => mongoose.disconnect())
})