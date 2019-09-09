const mongoose = require('mongoose')
const logic = require('../../')
const { expect } = require('chai')
const { User, Card } = require('../../../data')

describe('logic - retrieve drumkit', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let drumkitId, number, expiration, userId

    beforeEach(async() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        instrument = `instrument-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `123-${Math.random()}`

        namedrum = `namedrum-${Math.random()}`

        await User.deleteMany()
        const user = await User.create({ name, surname,instrument, email, password })
        const newDrumkit = new Drumkit({ name, sequences })
        userId = user.id
        drumkitId = newDrumkit.id
        user.drumkits.push(newDrumkit)
        await user.save()
    })

    it('should succeed on correct data', async () => {
        const drumkit = await logic.retrieveCard(drumkitId, userId)
        expect(drumkit).to.exist
        expect(drumkit._id.toString()).to.equal(cardId)
        expect(drumkit.number).to.equal(number)
        expect(drumkit.expiration).to.deep.equal(expiration)
    })

    it('should fail if the id is not a string', () =>
        expect(() => logic.retrieveCard(1234).to.throw(`card with id ${1234} does not exist`))
    )

    // ID
    it('should fail on empty id', async () => {
        cardId = ''

        try {
            await logic.retrieveCard(cardId, userId)
        } catch({message}) {
            expect(message).to.equal('id is empty or blank')
        }
    })

    it('should fail on undefined id', async () => {
        cardId = undefined

        try {
            await logic.retrieveCard(cardId, userId)
        } catch({message}) {
            expect(message).to.equal('id with value undefined is not a string')
        }
    })

    it('should fail on wrong id data type', async () => {
        cardId = 123

        try {
            await logic.retrieveCard(cardId, userId)
        } catch({message}) {
            expect(message).to.equal('id with value 123 is not a string')
        }
    })

    // creator
    it('should fail on empty creator', async () => {
        userId = ''

        try {
            await logic.retrieveCard(drumkitId, userId)
        } catch({message}) {
            expect(message).to.equal('creator is empty or blank')
        }
    })

    it('should fail on undefined creator', async () => {
        userId = undefined

        try {
            await logic.retrieveCard(cardId, userId)
        } catch({message}) {
            expect(message).to.equal('creator with value undefined is not a string')
        }
    })

    it('should fail on wrong creator data type', async () => {
        userId = 123

        try {
            await logic.retrieveCard(cardId, userId)
        } catch({message}) {
            expect(message).to.equal('creator with value 123 is not a string')
        }
    })

    after(() => mongoose.disconnect())
})