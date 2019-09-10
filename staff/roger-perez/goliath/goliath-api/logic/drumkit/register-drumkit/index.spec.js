const mongoose = require('mongoose')
const { expect } = require('chai')
const logic = require('../../')
const { User, Drumkit } = require('../../../data')

describe('logic - register drumkit', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name, surname,instrument,description, email, password, id, _name, drumkitName, sequences,creator
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
        const drumkit = await Drumkit.create({ drumkitName, sequences,creator })
        drumkit.creator.push(id)
    })

    it('should succeed on correct data', async () => {
        const _id = await logic.registerDrumkit(id, drumkitName, sequences,creator)
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

    

    after(() => mongoose.disconnect())
})