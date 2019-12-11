const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Card } = require('../../../data')

describe('logic - retrieve card', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))
    let cardId, number, expiry, userId
    beforeEach(async() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `123-${Math.random()}`
        number = Math.random()
        expiry = new Date()
        await User.deleteMany()
        const user = await User.create({ name, surname, email, password })
        const newCard = new Card({ number, expiry })
        userId = user.id
        cardId = newCard.id
        user.cards.push(newCard)
        await user.save()
    })
    it('should succeed on correct data', async () => {
        const card = await logic.card.retrieve(cardId, userId)
        expect(card).to.exist
        expect(card._id.toString()).to.equal(cardId)
        expect(card.number).to.equal(number)
        expect(card.expiry).to.deep.equal(expiry)
    })
    it('should fail if the id is not a string', () =>
        expect(() => logic.card.retrieve(1234).to.throw(`card with id ${1234} does not exist`))
    )
    
    it('should fail on empty id', async () => {
        cardId = ''
        try {
            await logic.card.retrieve(cardId, userId)
        } catch({message}) {
            expect(message).to.equal('id is empty or blank')
        }
    })
    it('should fail on undefined id', async () => {
        cardId = undefined
        try {
            await logic.card.retrieve(cardId, userId)
        } catch({message}) {
            expect(message).to.equal('id with value undefined is not a string')
        }
    })
    it('should fail on wrong id data type', async () => {
        cardId = 123
        try {
            await logic.card.retrieve(cardId, userId)
        } catch({message}) {
            expect(message).to.equal('id with value 123 is not a string')
        }
    })
    
    it('should fail on empty owner', async () => {
        userId = ''
        try {
            await logic.card.retrieve(cardId, userId)
        } catch({message}) {
            expect(message).to.equal('owner is empty or blank')
        }
    })
    it('should fail on undefined owner', async () => {
        userId = undefined
        try {
            await logic.card.retrieve(cardId, userId)
        } catch({message}) {
            expect(message).to.equal('owner with value undefined is not a string')
        }
    })
    it('should fail on wrong owner data type', async () => {
        userId = 123
        try {
            await logic.card.retrieve(cardId, userId)
        } catch({message}) {
            expect(message).to.equal('owner with value 123 is not a string')
        }
    })
    after(() => mongoose.disconnect())
})