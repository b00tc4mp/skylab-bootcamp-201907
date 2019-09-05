const { expect } = require('chai')
const logic = require('../../.')
const { User } = require('../../../models')
const mongoose = require('mongoose')

describe('logic - register user', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name, surname, email, password

    beforeEach(async() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
    })

    it('should succeed on correct data', async () => {
        const result=await logic.user.register(name, surname, email, password)
            expect(result).not.to.exist

            const user=await User.findOne({ email })  
            expect(user).to.exist
            expect(user.name).to.equal(name)
            expect(user.surname).to.equal(surname)
            expect(user.email).to.equal(email)
            expect(user.password).to.equal(password)
    })
    it('should fail if the mail already exists', async () => {
        try{
            await User.create({ name, surname, email, password })

        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`user with e-mail ${email} already exists`)
        }})
    after(() => mongoose.disconnect())
})