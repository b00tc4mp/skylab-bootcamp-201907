const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Card } = require('../../../data')

describe('logic - retrieve card', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let cardId, number, expiry, userId

    beforeEach(() => {

        number = Math.random()
        expiry = new Date()

        return User.deleteMany()
            .then(() => {
                name = `name-${Math.random()}`
                surname = `surname-${Math.random()}`
                email = `email-${Math.random()}@email.com`
                password = `123-${Math.random()}`
                return User.create({ name, surname, email, password })
                .then(user => {
                    const newCard = new Card({ number, expiry })
                    userId = user.id
                    cardId = newCard.id
                    user.cards.push(newCard)
                    return user.save()
                })
            })
    })

    it('should succeed on correct data', () =>
        logic.card.retrieve(cardId, userId)
            .then(card => {
                expect(card).to.exist
                expect(card._id.toString()).to.equal(cardId)
                expect(card.number).to.equal(number)
                expect(card.expiry).to.deep.equal(expiry)
            })
    )

    it('should fail if the id is not a string', () =>
        expect(() => logic.card.retrieve(1234).to.throw(`card with id ${1234} does not exist`))
    )

    after(() => mongoose.disconnect())
})