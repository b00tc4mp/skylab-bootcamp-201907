const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Card } = require('../../../models')

describe.only('logic - register card', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test',  { useNewUrlParser: true }))

    let id, cardId, number, expiry

    beforeEach(() => {
        
        number = `num-${Math.random()}`
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

/*     it('should succeed on correct data', () =>
        logic.card.register(cardId, userId)
            .then(card => { 
                expect(card).to.exist
                expect(card.number).to.exist
                expect(card.expiry).to.exist 
            })
    ) */

    it('should succeed on correct data', () => {
        let _cardId
        return logic.card.register(id, number, expiry)
            .then(cardId => {
                expect(cardId).to.exist
                _cardId = cardId
                return User.findOne({ _id: id })
                    .then(user => {
                        return user.cards[user.cards.length - 1]
                    })
            })
            .then(card => {
                const { id: cardId } = card
                expect(cardId).to.exist
                expect(cardId).to.equal(_cardId)
            })
    })

/*     it('should fail on unexisting card', () =>
        logic.card.unregister('5d5d5530531d455f75da9fF9')
            .then(() => { throw Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal('wrong credentials'))
    ) */

    after(() => mongoose.disconnect())
})