/* require('dotenv').config()

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
        const space = await logic.registerSpaceCouser(spaceId, coUserId)

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
            await logic.registerSpaceCouser(spaceId, existentUserId)
        } catch({error}) {
            expect(error).to.exist
            expect(error.message).to.equal(`user already registered in space with id ${spaceId}`)
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

    after(() => database.disconnect())
}) */