const mongoose = require('mongoose')
const logic = require('../../')
const { expect } = require('chai')
const { User, Card } = require('../../../data')

describe('logic - retrieve all cards', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let userId

    beforeEach(async() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `123-${Math.random()}`
        
        number = `num-${Math.random()}`
        expiration = new Date()

        await User.deleteMany()
        const user = await User.create({ name, surname, email, password })
        const newCard = new Card({ number, expiration })
        userId = user.id
        cardId = newCard.id
        user.cards.push(newCard)
        await user.save()
    })

    it('should succeed on correct data', async () => {
        const cards = await logic.retrieveAllCards(userId)

        expect(cards).to.exist
        expect(cards.length).to.equal(1)
    })

    it('should fail on empty owner', async () => {
        userId = ''

        try {
            await logic.retrieveAllCards(userId)
        } catch({message}) {
            expect(message).to.equal('owner is empty or blank')
        }
    })

    it('should fail on undefined owner', async () => {
        userId = undefined

        try {
            await logic.retrieveAllCards(userId)
        } catch({message}) {
            expect(message).to.equal('owner with value undefined is not a string')
        }
    })

    it('should fail on wrong owner data type', async () => {
        userId = 123

        try {
            await logic.retrieveAllCards(userId)
        } catch({message}) {
            expect(message).to.equal('owner with value 123 is not a string')
        }
    })

    after(() => mongoose.disconnect())
})