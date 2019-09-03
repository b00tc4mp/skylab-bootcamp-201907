const mongoose = require('mongoose')
const logic = require('../../')
const { expect } = require('chai')
const { User, Space } = require('../../../data')

describe('logic - update space', () => {

    before(() => mongoose.connect('mongodb://localhost/e-cohabitat-api-test',  { useNewUrlParser: true }))

    let title, type, address, passcode, id

    beforeEach(async() => {
        title = `name-${Math.random()}`
        type = `type-${Math.random()}`
        address = `address-${Math.random()}`
        passcode = `123-${Math.random()}`

        body = {
            title = `newName-${Math.random()}`,
            type = `newType-${Math.random()}`
        }
        
        await Space.deleteMany()

        const newSpace = await Space.create({ title, type, address, passcode })
        id = newSpace.id
    })

    it('should succeed on correct data', async () => {
        const result = await logic.updateSpace(id, body)
        expect(result).not.to.exist
        const space = await Space.findById(id)
        expect(space).to.exist
        expect(space.title).to.equal(body.title)
        expect(space.type).to.equal(body.type) 
            
    })

     it('should fail on non-existing space', async () => {
        id = '5d5d5530531d455f75da9fF9'

        try{
            await logic.updateSpace(id, body)

            throw new Error('should not reach this point')
        } catch({ message }) {
            expect(message).to.equal(`space with id ${id} does not exist`)
        }
    }) 

    it('should fail on empty space id', async () => {
        id = ''

        try{
            await logic.updateSpace(id, body)
        } catch({ message }) {
            expect(message).to.equal('space id is empty or blank')
        }
    })

    it('should fail on undefined space id', async () => {
        id = undefined

        try{
            await logic.updateSpace(id, body)
        } catch({ message }) {
            expect(message).to.equal("space id with value undefined is not a string")
        }
    })
     
    it('should fail on wrong space id data type', async() => {
        id = 123

        try{
            await logic.updateSpace(id, body)
        } catch({ message }) {
            expect(message).to.equal("space id with value 123 is not a string")
        }
    })

    it('should fail on empty body', async () => {
        body = ''

        try{
            await logic.updateSpace(id, body)
        } catch({ message }) {
            expect(message).to.equal('body is empty or blank')
        }
    })

    it('should fail on undefined body', async () => {
        body = undefined

        try{
            await logic.updateSpace(id, body)
        } catch({ message }) {
            expect(message).to.equal("body with value undefined is not an object")
        }
    })
     
    it('should fail on wrong body data type', async() => {
        body = 123

        try{
            await logic.updateSpace(id, body)
        } catch({ message }) {
            expect(message).to.equal("body with value 123 is not an object")
        }
    })

    after(() => mongoose.disconnect())
})