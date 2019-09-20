const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Card } = require('../../../models')

describe('logic - register card', () => {
    before(() => mongoose.connect('mongodb://172.17.0.2/my-stuff-api-test', { useNewUrlParser: true }))
    let number, expiry, id, _user, _cardId
    let name, surname, email, password
    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `123-${Math.random()}`
        number = Number((Math.random() * 10000000000).toFixed())
        expiry = '09/19'
        return (async () => {
            await User.deleteMany()
            const user = await User.create({ name, surname, email, password })
            _user = user
            id = user.id
        })()
    })
    it('should succeed on correct data', async () => {
        const cardId = await logic.card.register(id, number, expiry)
        expect(cardId).to.exist
        _cardId = cardId
        const user = await User.findById(id)
        expect(user.cards).to.exist
        expect(user.cards[user.cards.length - 1].id).to.equal(_cardId)
    })
    it('should fail if the card already exists', () => {
        _user.cards.push(new Card({ number, expiry }))
        return (async () => {
            await _user.save()
            try {
                await logic.card.register(id, number, expiry)
            } catch (error) {
                expect(error).to.exist
                expect(error.message).to.equal(`Card already exists.`)
            }
        })()
    })
    /* Number */
    it('should fail on empty card number', () =>
        expect(() =>
            logic.card.register(id, '', expiry)
        ).to.throw('card number is empty or blank')
    )
    it('should fail on undefined card number', () =>
        expect(() =>
            logic.card.register(id, undefined, expiry)
        ).to.throw(`card number with value undefined is not a number`)
    )
    it('should fail on wrong data type for card number', () =>
        expect(() =>
            logic.card.register(id, '123', expiry)
        ).to.throw(`card number with value 123 is not a number`)
    )
    /* Expiry */
    it('should fail on empty expiry date', () =>
        expect(() =>
            logic.card.register(id, number, '')
        ).to.throw('expiry date is empty or blank')
    )
    it('should fail on undefined expiry date', () =>
        expect(() =>
            logic.card.register(id, number, undefined)
        ).to.throw(`expiry date with value undefined is not a valid date`)
    )
    it('should fail on wrong data type for expiry date', () =>
        expect(() =>
            logic.card.register(id, number, 123)
        ).to.throw(`expiry date with value 123 is not a valid date`)
    )
})