/* require('dotenv').config()

const { expect } = require('chai')
const logic = require('../..')
const { database, models: { Space } } = require('data')

const { env: { DB_URL_TEST }} = process

describe('logic - update space', () => {

    before(() => database.connect(DB_URL_TEST))

    let title, type, picture, address, passcode, id

    beforeEach(async() => {
        const spaceTypeArray = ['kitchen', 'bathroom', 'living room', 'coworking', 'garden', 'rooftop', 'other']
        
        title = `name-${Math.random()}`
        type = `${spaceTypeArray[Math.floor(Math.random() * spaceTypeArray.length)]}`
        picture = `picture-${Math.random()}`
        address = `address-${Math.random()}`
        passcode = `123-${Math.random()}`

        body = {
            title: `newName-${Math.random()}`,
            type: `${spaceTypeArray[Math.floor(Math.random() * spaceTypeArray.length)]}`
        }
        
        await Space.deleteMany()

        const newSpace = await Space.create({ title, type, picture, address, passcode })
        id = newSpace.id.toString()
    })

    it('should succeed on correct data', async () => {
        const result = await logic.updateSpace(id, body)
        expect(result).not.to.exist
        const space = await Space.findById(id)
        expect(space).to.exist
        expect(space.title).to.equal(body.title)
        expect(space.type).to.equal(body.type) 
        expect(space.id).to.equal(id)
        expect(space.address).to.equal(address)
        expect(space.passcode).to.equal(passcode)
            
    })

     it('should fail on non-existent space', async () => {
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

    after(() => database.disconnect())
}) */