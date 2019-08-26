const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Card } = require('../../../models')

describe('logic - register property', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let userId, cardId, number, expiry

    beforeEach(() => {

        number = `number-${Math.random()}`
        expiry = '09/19'

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `password-${Math.random()}`

        return User.deleteMany()
        .then(() => User.create({ name, surname, email, password }))
        .then(user => {
                userId = user.id
                const newCard = new Card({ number, expiry })
                cardId = newCard.id
                user.cards.push(newCard)
                return user.save()
            })
    })

    it('should succeed on correct data', () =>
        logic.card.unregister(cardId)
            .then(card => {
                expect(card).not.to.exist
                User.findById(userId)
                .then(user => {
                    expect(user).to.exist
                    expect(user.cards).to.exist

                    const match = user.cards.find(card => card.id === cardId)
                    expect(match).not.to.exist
                })

            })
    )

    it('should fail if card does not exist', () =>
        Users.findById(userId).then(user => {
            user.cards = []
            logic.card.unregister(cardId)
            .catch( error =>{
                   expect(error).to.exist
                   expect(error.message).to.equal(`Card with id ${cardId} does not exist.`)
               })
        })
   )

    /* ID */
    it('should fail on empty id', () => 
        expect(() => 
               logic.property.retrieve('')
    ).to.throw('Property ID is empty or blank')
    )

     it('should fail on undefined id', () => 
        expect(() => 
               logic.property.retrieve(undefined)
    ).to.throw(`Property ID with value undefined is not a string`)
    )

     it('should fail on wrong data type for id', () => 
        expect(() => 
               logic.property.retrieve(123)
    ).to.throw(`Property ID with value 123 is not a string`)
    )

}