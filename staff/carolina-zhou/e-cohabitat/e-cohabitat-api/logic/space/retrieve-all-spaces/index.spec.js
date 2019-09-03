const { expect } = require('chai')
const logic = require('../../')
const { User, Space } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - retrieve all spaces', () => {

    before(() => mongoose.connect('mongodb://localhost/e-cohabitat-api-test', { useNewUrlParser: true }))
    
    let id, username, name, surname, email, password

    beforeEach(async() => {
        await Space.deleteMany()
        username = `username-${Math.random()}`
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `123-${Math.random()}`

        const user = await User.create({ username, name, surname, email, password })
        id = user._id.toString()
    })

    it('should succeed on correct data', async() => {
        const spaces = logic.retrieveAllSpaces(id)
        expect(spaces).to.exist
    })

    it('should fail on empty id', async () => {
        try{
            await logic.retrieveAllSpaces(' ')
        } catch({ message }) {
            expect(message).to.equal('user id is empty or blank')
        }
    })

    it('should fail on undefined id', async () => {
          try{
            await logic.retrieveAllSpaces(undefined)
        } catch({ message }) {
            expect(message).to.equal("user id with value undefined is not a string")
        }
    })
     
    it('should fail on wrong id data type', async() => {
         try{
            await logic.retrieveAllSpaces(123)
        } catch({ message }) {
                expect(message).to.equal("user id with value 123 is not a string")
        }
    })

    after(() => mongoose.disconnect())
})