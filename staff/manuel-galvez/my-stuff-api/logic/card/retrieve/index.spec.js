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
        logic.card.retrieve(cardId)
            .then(card => {

                // Format expiry to valid date
                const dateArray = expiry.split('/')
                const month = Number(dateArray[0])
                const year = Number(`20${dateArray[1]}`)
                const expiryDate = new Date(year, month)

                expect(card).to.exist
                expect(card.number).to.equal(number)
                expect(card.expiry).to.equal(expiryDate)
            })
    )

    it('should fail if card does not exist', () =>
        Property.deleteMany()
        .then(() => {
            logic.property.retrieve(propertyId)
            .catch( error =>{
                   expect(error).to.exist
                   expect(error.message).to.equal(`Property with id ${propertyId} does not exist.`)
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

})