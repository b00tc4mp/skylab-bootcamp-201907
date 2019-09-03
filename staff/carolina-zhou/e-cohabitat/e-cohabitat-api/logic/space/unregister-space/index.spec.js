const mongoose = require('mongoose')
const logic = require('../../')
const { expect } = require('chai')
const { User, Space } = require('../../../data')

describe('logic - unregister property', () => {

    before(() => mongoose.connect('mongodb://localhost/e-cohabitat-api-test',  { useNewUrlParser: true }))

    let title, type, address, passcode, id, username, name, surname, email, password

    beforeEach(async() => {
        title = `name-${Math.random()}`
        type = `type-${Math.random()}`
        address = `address-${Math.random()}`
        passcode = `123-${Math.random()}`

        await Space.deleteMany()
        username = `username-${Math.random()}`
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `123-${Math.random()}`

        const user = await User.create({ username, name, surname, email, password })
        id = user._id.toString()

        const newSpace = await Space.create({ title, type, address, passcode })
        id = newSpace.id
    })

    it('should succeed on correct data', async () => {
        const result = await logic.unregisterSpace(id)
        expect(result).not.to.exist
        const space = await Space.findById(id)
        expect(space).not.to.exist
    })

    it('should fail on unexisting space', async () => {
        try {
            await logic.unregisterSpace('5d5d5530531d455f75da9fF9')
            
            throw Error('should not reach this point')
        } catch({message}) {
            expect(message).to.equal('wrong data provided')
        }
    })

    it('should fail on empty space id', async () => {
        id = ' '

        try {
            await logic.unregisterSpace(id)
        } catch({ message }) {
            expect(message).to.equal('space id is empty or blank')
        }
    })

    it('should fail on undefined space id', async () => {
        id = undefined

        try {
            await logic.unregisterSpace(id)
        } catch({ message }) {
            expect(message).to.equal("space id with value undefined is not a string")
        }
    })
     
    it('should fail on wrong space id data type', async() => {
        id = 123

         try {
            await logic.unregisterSpace(id)
        } catch({ message }) {
            expect(message).to.equal("space id with value 123 is not a string")
        }
       
    })

    after(() => mongoose.disconnect())
})