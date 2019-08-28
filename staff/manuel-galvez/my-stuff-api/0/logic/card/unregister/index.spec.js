const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Card } = require('../../../models')

describe('logic - unregister card', () => {

    before(() => mongoose.connect('mongodb://localhost/my-stuff-api-test', { useNewUrlParser: true }))

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
        logic.card.unregister(userId, cardId)
            .then(card => {
                expect(card).not.to.exist
                return User.findById(userId)
                    .then(user => {
                        expect(user).to.exist
                        expect(user.cards).to.exist

                        const match = user.cards.find(card => card.id === cardId)
                        expect(match).not.to.exist
                })

            })
    )

    it('should fail if card does not exist', () =>
        User.findById(userId).then(user => {
            user.cards = []
            return logic.card.unregister(userId, cardId)
            .catch( error =>{
                   expect(error).to.exist
                   expect(error.message).to.equal(`Card with id ${cardId} does not exist.`)
               })
        })
   )

    /* USER ID */
    it('should fail on empty User ID', () => 
        expect(() => 
               logic.card.unregister('', cardId)
    ).to.throw('User ID is empty or blank')
    )

     it('should fail on undefined User ID', () => 
        expect(() => 
               logic.card.unregister(undefined, cardId)
    ).to.throw(`User ID with value undefined is not a string`)
    )

     it('should fail on wrong data type for id', () => 
        expect(() => 
               logic.card.unregister(123, cardId)
    ).to.throw(`User ID with value 123 is not a string`)
     )

        /* USER ID */
    it('should fail on empty Card ID', () => 
        expect(() => 
               logic.card.unregister(userId, '')
    ).to.throw('Card ID is empty or blank')
    )

     it('should fail on undefined Card ID', () => 
        expect(() => 
               logic.card.unregister(userId, undefined)
    ).to.throw(`Card ID with value undefined is not a string`)
    )

     it('should fail on wrong data type for Card ID', () => 
        expect(() => 
               logic.card.unregister(userId, 123)
    ).to.throw(`Card ID with value 123 is not a string`)
    )

})
