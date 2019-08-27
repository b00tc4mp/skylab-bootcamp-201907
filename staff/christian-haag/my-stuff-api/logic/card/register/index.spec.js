const { expect } = require('chai')
const logic = require('../../.')
const { User } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - add card', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let id, name, surname, email, password, cardBrand, cardType, cardNumber, expiry

    beforeEach(() => {
        name = `C-name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        cardBrand = 'Visa'
        cardType = 'Credit'
        cardNumber = Math.floor(Math.random() * 9999999999999999)
        expiry = new Date


        return User.create({ name, surname, email, password })
            .then(user => id = user.id)
    })

    it('should fail if user does not exist', () => {

        return logic.card.register('hbcbw6f461ce8684cv1s', cardBrand, cardType, cardNumber, expiry)
            .catch(error => {
                expect(error).to.throw('User with id hbcbw6f461ce8684cv1s does not exist')
            })
    })

    it('schould add card only if user exists', () =>
        logic.card.register(id, cardBrand, cardType, cardNumber, expiry)
            .then(() => {
                return User.findOne({ _id: id }).lean()
                    .then(result => {
                        const { cards } = result
                        expect(result).to.exist
                        expect(cards).to.exist
                        expect(cards[0].number).to.equal(cardNumber)
                    })
            })

    )

    describe('logic - add another card', () => {

        let id, name, surname, email, password, cardBrand, cardType, cardNumber, expiry

        beforeEach(() => {
            name = `g-name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`

            cardBrand = 'Visa'
            cardType = 'Credit'
            cardNumber = Math.floor(Math.random() * 9999999999999999)
            expiry = new Date

            number2 = 1254658912561234


            return User.create({ name, surname, email, password })
                .then(user => {
                    id = user.id
                    return logic.addNewCard(id, cardBrand, cardType, cardNumber, expiry)
                })

        })

        it('should add a second card', () =>
            logic.card.register(id, cardBrand, cardType, number2, expiry)
                .then(() => {
                    return User.findOne({ _id: id }).lean()
                        .then(result => {
                            const { cards } = result
                            expect(result).to.exist
                            expect(cards).to.exist
                            expect(cards[1].number).to.equal(number2)
                        })
                })
        )

        it('should fail if card number already exists', () => {
            logic.card.register(id, cardBrand, cardType, cardNumber, expiry)
                .then(result => {
                    expect(result).to.undefined
                })

        })
    })
    after(() => mongoose.disconnect())
})