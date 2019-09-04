const { expect } = require('chai')
const logic = require('../../')
const { User } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - retrieve user', () => {
    before(() => mongoose.connect('mongodb://localhost/e-cohabitat-api-test', { useNewUrlParser: true }))

    let username, name, surname, email, password, id

    beforeEach(async () => {
        username = `username-${Math.random()}`
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
        const user = await User.create({ username, name, surname, email, password })
        id = user.id
    })

    it('should succeed on correct data', async() =>{
         const result = await logic.retrieveUser(id)
            
                expect(result).to.exist
                expect(result.id).to.equal(id)
                expect(result._id).not.to.exist
                expect(result.name).to.equal(name)
                expect(result.surname).to.equal(surname)
                expect(result.email).to.equal(email)
                expect(result.password).not.to.exist
    })

    it('should fail on empty id', async () => {
        try{
            await logic.retrieveUser(' ')
        } catch({ message }) {
            expect(message).to.equal('user id is empty or blank')
        }
    })

     it('should fail on undefined id', async () => {
          try{
            await logic.retrieveUser(undefined)
        } catch({ message }) {
            expect(message).to.equal("user id with value undefined is not a string")
        }
     })
     
     it('should fail on wrong id data type', async() => {
         try{
                await logic.retrieveUser(123)
            } catch({ message }) {
                expect(message).to.equal("user id with value 123 is not a string")
            }
       
     })

    after(() => mongoose.disconnect())
})