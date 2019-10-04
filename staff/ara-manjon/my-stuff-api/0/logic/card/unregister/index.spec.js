const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Card } = require('../../../data')

describe('logic - unregister card', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test',  { useNewUrlParser: true }))

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
        logic.card.unregister(cardId, userId)
            .then(card => {
                expect(card).not.to.exist
            })
    )

    after(() => mongoose.disconnect())
})