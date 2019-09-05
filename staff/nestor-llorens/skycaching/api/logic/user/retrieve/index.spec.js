const { expect } = require('chai')
const logic = require('../.')
const { User } = require('../../../../data')
const mongoose = require('mongoose')

describe('logic - retrieve user', () => {

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

    it('should succeed on correct id', async() => {
        const user = await logic.retrieveUser(id)
            expect(user).to.exist
            expect(user.id).to.equal(id)
            expect(user._id).not.to.exist
            expect(user.name).to.equal(name)
            expect(user.surname).to.equal(surname)
            expect(user.email).to.equal(email)
            expect(user.password).not.to.exist
    
    })

    it('should fail on wrong id', async() =>{
        try{
            await logic.retrieveUser('123456789012')
        }catch(error) {
            expect(error.message).to.equal(`user with id 123456789012 not found`)
        }   
    })

        after(() => mongoose.disconnect())
})