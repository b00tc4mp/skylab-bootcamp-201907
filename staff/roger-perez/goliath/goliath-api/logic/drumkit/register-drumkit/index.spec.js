const mongoose = require('mongoose')
const { expect } = require('chai')
const logic = require('../../')
const { User, Drumkit } = require('../../../data')

describe('logic - register drumkit', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name, surname,instrument,description, email, password, id, _name, drumkitName
    beforeEach(async() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        instrument = `instrument-${Math.random()}`
        description = `description-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        _name = `_name-${Math.random()}`

        await User.deleteMany()
        const user = await User.create({ name, surname,instrument,description, email, password })
        id = user.id
        drumkit.creator.push(id)
    })

    it('should succeed on correct data', async () => {
        const _id = await logic.registerDrumkit(id, drumkitName, sequences)
        expect(drumkit).to.exist

        drumkitId = _id

        const drumkit = await Drumkit.findById(id)
        expect(drumkit).to.exist
        expect(drummkit.drumkitName).to.equal(drumkitName)
        expect(drumkit.sequences).to.equal(sequences)
        expect(drumkit.creator).to.include(id)

    })

    // user id
    it('should fail on empty id', async () => {
        id = ''

        try {
            await logic.registerDrumkit(id, _number, expiration)
        } catch({message}) {
            expect(message).to.equal('user id is empty or blank')
        }
    })

    it('should fail on undefined id', async () => {
        id = undefined

        try {
            await logic.registerDrumkit(id, _number, expiration)
        } catch({message}) {
            expect(message).to.equal('user id with value undefined is not a string')
        }
    })

    it('should fail on wrong id data type', async () => {
        id = 123

        try {
            await logic.registerDrumkit(id, _number, expiration)
        } catch({message}) {
            expect(message).to.equal('user id with value 123 is not a string')
        }
    })

    // number
    it('should fail on empty number', async () => {
        number = ''

        try {
            await logic.registerDrumkit(id, _number, expiration)
        } catch({message}) {
            expect(message).to.equal('number is empty or blank')
        }
    })

    it('should fail on undefined number', async () => {
        number = undefined

        try {
            await logic.registerDrumkit(id, _number, expiration)
        } catch({message}) {
            expect(message).to.equal('number with value undefined is not a string')
        }
    })

    it('should fail on wrong number data type', async () => {
        number = 123

        try {
            await logic.registerDrumkit(id, _number, expiration)
        } catch({message}) {
            expect(message).to.equal('number with value 123 is not a string')
        }
    })

    // expiration
    it('should fail on empty expiration', async () => {
        expiration = ''

        try {
            await logic.registerDrumkit(id, _number, expiration)
        } catch({message}) {
            expect(message).to.equal('expiration is empty or blank')
        }
    })

    it('should fail on undefined expiration', async () => {
        expiration = undefined

        try {
            await logic.registerDrumkit(id, _number, expiration)
        } catch({message}) {
            expect(message).to.equal('expiration date with value undefined is not a date')
        }
    })

    it('should fail on wrong expiration data type', async () => {
        expiration = 123

        try {
            await logic.registerDrumkit(id, _number, expiration)
        } catch({message}) {
            expect(message).to.equal('expiration date with value 123 is not a date')
        }
    })

    after(() => mongoose.disconnect())
})