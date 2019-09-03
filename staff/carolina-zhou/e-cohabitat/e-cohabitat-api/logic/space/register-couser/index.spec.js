const mongoose = require('mongoose')
const logic = require('../../')
const { expect } = require('chai')
const { User, Space } = require('../../../data')

describe('logic - register space co-user', () => {

    before(() => mongoose.connect('mongodb://localhost/e-cohabitat-api-test', { useNewUrlParser: true }))

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

        const user = await User.create({ username, name, surname, email, password })
        coUserId = user._id.toString()

        const space = await Space.create({ title, type, address, passcode })
        spaceId = space.id.toString()
    })

    it('should succeed on correct data', async () => {
        const space = await logic.registerSpaceCouser(spaceId, coUserId)

        expect(space).to.exist
        expect(space.id).to.equal(spaceId)
        expect(space.title).to.equal(title)
        expect(space.type).to.equal(type)
        expect(space.address).to.equal(address)
        expect(space.passcode).to.equal(passcode)
    })

    it('should fail if the space already exists', async () => {
        try {
            await logic.registerSpaceCouser(spaceId, coUserId)
        } catch({error}) {
            expect(error).to.exist
            expect(error.message).to.equal(`space already exists`)
        }
    })

    // space
    it('should fail on empty space id', async () => {
        spaceId = ''

        try {
            await logic.registerSpaceCouser(spaceId, coUserId)
        } catch({message}) {
            expect(message).to.equal('space id is empty or blank')
        }
    })

    it('should fail on undefined space id', async () => {
        spaceId = undefined

        try {
            await logic.registerSpaceCouser(spaceId, coUserId)
        } catch({message}) {
            expect(message).to.equal('space id with value undefined is not a string')
        }
    })

    it('should fail on wrong space id data type', async () => {
        spaceId = 123

        try {
            await logic.registerSpaceCouser(spaceId, coUserId)
        } catch({message}) {
            expect(message).to.equal('space id with value 123 is not a string')
        }
    })

    // co-user
    it('should fail on empty user', async () => {
        coUserId = ''

        try {
            await logic.registerSpaceCouser(spaceId, coUserId)
        } catch({message}) {
            expect(message).to.equal('co-user id is empty or blank')
        }
    })

    it('should fail on undefined owner', async () => {
        coUserId = undefined

        try {
            await logic.registerSpaceCouser(spaceId, coUserId)
        } catch({message}) {
            expect(message).to.equal('co-user id with value undefined is not a string')
        }
    })

    it('should fail on wrong user data type', async () => {
        coUserId = 123

        try {
            await logic.registerSpaceCouser(spaceId, coUserId)
        } catch({message}) {
            expect(message).to.equal('co-user id with value 123 is not a string')
        }
    })

    after(() => mongoose.disconnect())
})