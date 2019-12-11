require('dotenv').config()

const { expect } = require('chai')
const logic = require('../..')
const { database, models: { User, Space } } = require('data')

const { env: { DB_URL_TEST }} = process

describe('logic - register space co-user', () => {

    before(() => database.connect(DB_URL_TEST))

    let title, type, picture, address, passcode, cousers
    let username, name, surname, email, password, spaces
    let username2, name2, surname2, email2, password2
    let spaceId, coUserId, existentUserId

    beforeEach(async() => {
        const spaceTypeArray = ['kitchen', 'bathroom', 'living room', 'coworking', 'garden', 'rooftop', 'other']
        
        title = `name-${Math.random()}`
        type = `${spaceTypeArray[Math.floor(Math.random() * spaceTypeArray.length)]}`
        picture = `picture-${Math.random()}`
        address = `address-${Math.random()}`
        passcode = `123-${Math.random()}`

        await Space.deleteMany()
        username = `username-${Math.random()}`
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `123-${Math.random()}`

        username2 = `username-${Math.random()}`
        name2 = `name-${Math.random()}`
        surname2 = `surname-${Math.random()}`
        email2 = `email-${Math.random()}@email.com`
        password2 = `123-${Math.random()}`

        const user = await User.create({ username, name, surname, email, password, spaces })
        coUserId = user._id.toString()

        const space = await Space.create({ title, type, picture, address, passcode, cousers })
        spaceId = space._id.toString()

        const existentUser = await User.create({ username: username2, name: name2, surname: surname2, email: email2, password: password2, spaces })
        existentUserId = existentUser._id.toString()

        existentUser.spaces.push(spaceId)
        await existentUser.save()

        space.cousers.push(existentUserId)
        await space.save()
    })

    it('should succeed on correct data', async () => {
        const space = await logic.registerSpaceCouser(email, passcode, spaceId, existentUserId)

        expect(space).to.exist
        expect(space.id).to.equal(spaceId)
        expect(space.title).to.equal(title)
        expect(space.type).to.equal(type)
        expect(space.picture).to.equal(picture)
        expect(space.address).to.equal(address)
        expect(space.passcode).to.equal(passcode)
        expect(space.cousers).to.include(existentUserId, coUserId)
        expect(space.cousers[0].toString()).to.equal(existentUserId)
        expect(space.cousers[1].toString()).to.equal(coUserId)
    })

    it('should fail if the co-user is already registered', async () => {
        try {
            await logic.registerSpaceCouser(email2, passcode, spaceId, existentUserId)

        } catch({error}) {
            expect(error).to.exist
            expect(error.message).to.equal(`user already registered in space with id ${spaceId}`)
        }
    })

    // co-user email
    it('should fail on empty co-user email', async () => {
        email = ''

        try {
            await logic.registerSpaceCouser(email, passcode, spaceId, existentUserId)
        } catch({message}) {
            expect(message).to.equal('co-user email is empty or blank')
        }
    })

    it('should fail on undefined co-user email', async () => {
        email = undefined

        try {
            await logic.registerSpaceCouser(email, passcode, spaceId, existentUserId)
        } catch({message}) {
            expect(message).to.equal('co-user email with value undefined is not a string')
        }
    })

    it('should fail on wrong co-user email data type', async () => {
        email = 123

        try {
            await logic.registerSpaceCouser(email, passcode, spaceId, existentUserId)
        } catch({message}) {
            expect(message).to.equal('co-user email with value 123 is not a string')
        }
    })

    // space passcode
    it('should fail on empty space passcode', async () => {
        passcode = ''

        try {
            await logic.registerSpaceCouser(email, passcode, spaceId, existentUserId)
        } catch({message}) {
            expect(message).to.equal('space passcode is empty or blank')
        }
    })

    it('should fail on undefined space passcode', async () => {
        passcode = undefined

        try {
            await logic.registerSpaceCouser(email, passcode, spaceId, existentUserId)
        } catch({message}) {
            expect(message).to.equal('space passcode with value undefined is not a string')
        }
    })

    it('should fail on wrong space passcode data type', async () => {
        passcode = 123

        try {
            await logic.registerSpaceCouser(email, passcode, spaceId, existentUserId)
        } catch({message}) {
            expect(message).to.equal('space passcode with value 123 is not a string')
        }
    })

    // space id
    it('should fail on empty space id', async () => {
        spaceId = ''

        try {
            await logic.registerSpaceCouser(email, passcode, spaceId, existentUserId)
        } catch({message}) {
            expect(message).to.equal('space id is empty or blank')
        }
    })

    it('should fail on undefined space id', async () => {
        spaceId = undefined

        try {
            await logic.registerSpaceCouser(email, passcode, spaceId, existentUserId)
        } catch({message}) {
            expect(message).to.equal('space id with value undefined is not a string')
        }
    })

    it('should fail on wrong space id data type', async () => {
        spaceId = 123

        try {
            await logic.registerSpaceCouser(email, passcode, spaceId, existentUserId)
        } catch({message}) {
            expect(message).to.equal('space id with value 123 is not a string')
        }
    })

    // existent user id
    it('should fail on empty existent user id', async () => {
        existentUserId = ''

        try {
            await logic.registerSpaceCouser(email, passcode, spaceId, existentUserId)
        } catch({message}) {
            expect(message).to.equal('existent user id is empty or blank')
        }
    })

    it('should fail on undefined existent user id', async () => {
        existentUserId = undefined

        try {
            await logic.registerSpaceCouser(email, passcode, spaceId, existentUserId)
        } catch({message}) {
            expect(message).to.equal('existent user id with value undefined is not a string')
        }
    })

    it('should fail on wrong existent user id data type', async () => {
        existentUserId = 123

        try {
            await logic.registerSpaceCouser(email, passcode, spaceId, existentUserId)
        } catch({message}) {
            expect(message).to.equal('existent user id with value 123 is not a string')
        }
    })

    after(() => database.disconnect())
})