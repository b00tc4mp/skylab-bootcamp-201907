const { expect } = require('chai')
const logic = require('../../.')
const randomDate = require('../../../utils/random-date')
const { User, Card } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - retrieve card', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))


    const cardArr = ['Visa', 'Mastercard', 'American-Express', 'Targeta-Black']
    let rand = Math.floor(Math.random() * cardArr.length)
    let userId, cardId, name, surname, email, password, cardBrand, cardType, number, expiry

    beforeEach(() => {
        name = `C-name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        cardBrand = cardArr[rand]
        cardType = Math.random() >= 0.5 ? 'Credit' : 'Debit'
        number = Math.floor(Math.random() * 9999999999999999)
        expiry = randomDate()



        return Card.create({ cardBrand, cardType, number, expiry })
            .then(card => cardId = card.id)

    })

    it('should fail on empty id', () =>
        expect(() =>
            logic.retrieveCard('')
        ).to.throw('id is empty or blank')
    )

    it('should fail on undefined id', () =>
        expect(() =>
            logic.retrieveCard(undefined)
        ).to.throw(`id with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.retrieveCard(123456798)
        ).to.throw(`id with value 123456798 is not a string`)
    )


    it('schould retireve card by id', () => {
        return logic.retrieveCard(cardId)
            .then(card => {
                debugger
                expect(card).to.exist
                expect(card.id).to.equal(cardId)
            })
    })

    after(() => mongoose.disconnect())
})
