const { expect } = require('chai')
const logic = require('..')
const { User } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - register user', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name, surname, email, password, card

    beforeEach(async () => {

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        card = []
        await User.deleteMany()

    })

    it('should succeed on correct data', async () => {
        
        const user = await logic.registerUser(name, surname, email, password, card)

        expect(user).to.exist
        expect(user.name).to.equal(name)
        expect(user.surname).to.equal(surname)
        expect(user.email).to.equal(email)
        expect(user.password).to.equal(password)

    })

    it('error because e-mail already exist', async() => {
        await User.create({name, surname, email, password, card})
        
        try{

            await logic.registerUser(name, surname, email, password, card)

        }catch(error){
            
            expect(error.message).to.equal(`user with e-mail ${email} already exists`)
        }

        await User.deleteMany()
    })

    after(() => mongoose.disconnect())
})