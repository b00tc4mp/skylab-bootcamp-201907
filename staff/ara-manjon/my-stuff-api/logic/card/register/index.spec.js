const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Card } = require('../../../data')

describe.only('logic - unregister card', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test',  { useNewUrlParser: true }))

    let cardId, number, expiry, userId

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

    it('should succeed on correct data', () =>
        logic.card.unregister(cardId, userId)
            .then(card => {
                expect(card).not.to.exist
              /*   expect(card.number).not.to.exist
                expect(card.expiry).not.to.exist */
            })
    )

/*     it('should fail on unexisting card', () =>
        logic.card.unregister('5d5d5530531d455f75da9fF9')
            .then(() => { throw Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal('wrong credentials'))
    ) */

    after(() => mongoose.disconnect())
})