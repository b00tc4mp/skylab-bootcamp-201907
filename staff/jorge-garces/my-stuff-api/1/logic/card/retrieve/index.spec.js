const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Card } = require('../../../models')

describe('logic - retrieve card', () => {
    before(() => mongoose.connect('mongodb://172.17.0.2/my-stuff-api-test', { useNewUrlParser: true }))
    let userId, cardId, number, expiry, expiryDate
    beforeEach(() => {
        number = Number((Math.random() * 10000000000).toFixed())
        expiry = '09/19'
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `password-${Math.random()}`
        return (async () => {
            await User.deleteMany()
            const user = await User.create({ name, surname, email, password })
            userId = user.id
            // Format expiry to valid date
            const dateArray = expiry.split('/')
            const month = Number(dateArray[0])
            const year = Number(`20${dateArray[1]}`)
            expiryDate = new Date(year, month)
            const newCard = new Card({ number, expiry: expiryDate })
            cardId = newCard.id
            user.cards.push(newCard)
            await user.save()
        })()
    })
    it('should succeed on correct data', async () => {
        const card = await logic.card.retrieve(userId, cardId)
        expect(card).to.exist
        expect(card.number).to.equal(number)
        expect(card.expiry).to.deep.equal(expiryDate)
    }
    )
    it('should fail if user does not exist', async () => {
        await User.deleteMany()
        try {
            const user = await User.findById(userId)
            expect(user).not.to.exist
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`User with id ${cardId} does not exist.`)
        }
    })
    it('should fail if card does not exist', async () => {
        const user = await User.findById(userId)
        expect(user).to.exist
        user.cards = []
        await user.save()
        try {
            await logic.card.retrieve(userId, cardId)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`Card with id ${cardId} does not exist.`)
        }
    })
    /* USER ID */
    it('should fail on empty User ID', () =>
        expect(() =>
            logic.card.retrieve('', cardId)
        ).to.throw('User ID is empty or blank')
    )
    it('should fail on undefined User ID', () =>
        expect(() =>
            logic.card.retrieve(undefined, cardId)
        ).to.throw(`User ID with value undefined is not a string`)
    )
    it('should fail on wrong data type for User ID', () =>
        expect(() =>
            logic.card.retrieve(123, cardId)
        ).to.throw(`User ID with value 123 is not a string`)
    )
    /* CARD ID */
    it('should fail on empty Card ID', () =>
        expect(() =>
            logic.card.retrieve(userId, '')
        ).to.throw('Card ID is empty or blank')
    )
    it('should fail on undefined Card ID', () =>
        expect(() =>
            logic.card.retrieve(userId, undefined)
        ).to.throw(`Card ID with value undefined is not a string`)
    )
    it('should fail on wrong data type for Card ID', () =>
        expect(() =>
            logic.card.retrieve(userId, 123)
        ).to.throw(`Card ID with value 123 is not a string`)
    )
})