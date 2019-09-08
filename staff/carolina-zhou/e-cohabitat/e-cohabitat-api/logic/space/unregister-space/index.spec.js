require('dotenv').config()

const { expect } = require('chai')
const logic = require('../..')
const { database, models: { User, Space } } = require('data')

const { env: { DB_URL_TEST }} = process

describe('logic - unregister space', () => {

    before(() => database.connect(DB_URL_TEST))

    let title, type, address, passcode, cousers, userId, spaceId, username, name, surname, email, password, spaces

    beforeEach(async() => {
        const spaceTypeArray = ['kitchen', 'bathroom', 'living room', 'coworking', 'garden', 'rooftop', 'other']
        
        title = `name-${Math.random()}`
        type = `${spaceTypeArray[Math.floor(Math.random() * spaceTypeArray.length)]}`
        address = `address-${Math.random()}`
        passcode = `123-${Math.random()}`

        username = `username-${Math.random()}`
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `123-${Math.random()}`

        await User.deleteMany()

        const newSpace = await Space.create({ title, type, address, passcode, cousers })
        spaceId = newSpace._id.toString() 

        const user = await User.create({ username, name, surname, email, password, spaces})
        userId = user._id.toString()
        
        newSpace.cousers.push(userId)
        await newSpace.save()

        user.spaces.push(spaceId)
        await user.save()
    })

    it('should succeed on correct data', async () => {
        const result = await logic.unregisterSpace(userId, spaceId)
        expect(result).not.to.exist

        const space = await Space.findById(spaceId)
        expect(space).not.to.exist
    })

    it('should fail on unexistent user', async () => {
        try {
            await logic.unregisterSpace('5d5d5530531d455f75da9fF9', spaceId)
            
            throw Error('should not reach this point')
        } catch({message}) {
            expect(message).to.equal('there is no user with the provided user id')
        }
    })

    it('should fail on unexistent space', async () => {
        try {
            await logic.unregisterSpace(userId, '5d5d5530531d455f75da9fF9')
            
            throw Error('should not reach this point')
        } catch({message}) {
            expect(message).to.equal('there is no space with the provided space id')
        }
    })

    it('should fail on empty user id', async () => {
        userId = ' '

        try {
            await logic.unregisterSpace(userId, spaceId)
        } catch({ message }) {
            expect(message).to.equal('user id is empty or blank')
        }
    })

    it('should fail on undefined user id', async () => {
        userId = undefined

        try {
            await logic.unregisterSpace(userId, spaceId)
        } catch({ message }) {
            expect(message).to.equal("user id with value undefined is not a string")
        }
    })
     
    it('should fail on wrong user id data type', async() => {
        userId = 123

         try {
            await logic.unregisterSpace(userId, spaceId)
        } catch({ message }) {
            expect(message).to.equal("user id with value 123 is not a string")
        }
       
    })

    it('should fail on empty space id', async () => {
        spaceId = ' '

        try {
            await logic.unregisterSpace(userId, spaceId)
        } catch({ message }) {
            expect(message).to.equal('space id is empty or blank')
        }
    })

    it('should fail on undefined space id', async () => {
        spaceId = undefined

        try {
            await logic.unregisterSpace(userId, spaceId)
        } catch({ message }) {
            expect(message).to.equal("space id with value undefined is not a string")
        }
    })
     
    it('should fail on wrong space id data type', async() => {
        spaceId = 123

         try {
            await logic.unregisterSpace(userId, spaceId)
        } catch({ message }) {
            expect(message).to.equal("space id with value 123 is not a string")
        }
       
    })

    after(() => database.disconnect())
})