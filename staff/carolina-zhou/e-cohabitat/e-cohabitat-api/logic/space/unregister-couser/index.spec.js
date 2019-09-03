const mongoose = require('mongoose')
const logic = require('../../')
const { expect } = require('chai')
const { User, Space } = require('../../../data')

describe('logic - unregister space co-user', () => {

    before(() => mongoose.connect('mongodb://localhost/e-cohabitat-api-test',  { useNewUrlParser: true }))

    let title, type, address, passcode, username, name, surname, email, password, spaceId, coUserId

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

        const newUser = await User.create({ username, name, surname, email, password })
        coUserId = user._id.toString()

        const newProperty = await Space.create({ title, type, address, passcode })
        spaceId = property.id

        newProperty.co-users.push(newUser)
        await newProperty.save()
    })

    it('should succeed on correct data', async () => {
        const result = await logic.unregisterSpaceCouser(spaceId, coUserId)
        expect(result).to.exist
        const space = await Space.findById(spaceId)
        expect(space).to.exist
        const user = await User.findById(coUserId)
        expect(user).not.to.exist
    })

    it('should fail on unexisting property', async () => {
        spaceId = '12342657'
        try {
            await logic.unregisterSpaceCouser(spaceId, coUserId)
            
            throw Error('should not reach this point')
        } catch({message}) {
            expect(message).to.equal('wrong space id provided')
        }
    })

    it('should fail on existing property but wrong co-user', async () => {
        coUserId = '5d5d5530531d455f75da9fF9'
        try {
            await logic.unregisterSpaceCouser(spaceId, coUserId)
            
            throw Error('should not reach this point')
        } catch({message}) {
            expect(message).to.equal('user with id 5d5d5530531d455f75da9fF9 is not a co-user')
        }
    })

    it('should fail on unexisting co-user', async () => {
        coUserId = '124368587'
        try {
            await logic.unregisterSpaceCouser(spaceId, coUserId)
            
            throw Error('should not reach this point')
        } catch({message}) {
            expect(message).to.equal('wrong co-user id provided')
        }
    })

    it('should fail on empty space id', async () => {
        spaceId = ' '

        try{
            await logic.unregisterSpaceCouser(spaceId, coUserId)
        } catch({ message }) {
            expect(message).to.equal('space id is empty or blank')
        }
    })

    it('should fail on undefined space id', async () => {
        spaceId = undefined

        try{
            await logic.unregisterSpaceCouser(spaceId, coUserId)
        } catch({ message }) {
            expect(message).to.equal("space id with value undefined is not a string")
        }
    })
     
    it('should fail on wrong space id data type', async() => {
        spaceId = 123

         try{
            await logic.unregisterSpaceCouser(spaceId, coUserId)
        } catch({ message }) {
            expect(message).to.equal("space id with value 123 is not a string")
        }
    })

    it('should fail on empty co-user id', async () => {
        coUserId = ' '

        try{
            await logic.unregisterSpaceCouser(spaceId, coUserId)
        } catch({ message }) {
            expect(message).to.equal('co-user id is empty or blank')
        }
    })

    it('should fail on undefined co-user id', async () => {
        coUserId = undefined

        try{
            await logic.unregisterSpaceCouser(spaceId, coUserId)
        } catch({ message }) {
            expect(message).to.equal("co-user id with value undefined is not a string")
        }
    })
     
    it('should fail on wrong co-user id data type', async() => {
        coUserId = 123

         try{
            await logic.unregisterSpaceCouser(spaceId, coUserId)
        } catch({ message }) {
                expect(message).to.equal("co-user id with value 123 is not a string")
        }
    })

    after(() => mongoose.disconnect())
})