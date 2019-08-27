const { expect } = require('chai')
const logic = require('../../.')
const randomDate = require('../../../utils/random-date')
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
        expiry = '2020-06-06'

        return User.deleteMany()
            .then(() => {
                return User.create({ name, surname, email, password })
            })
            .then(user => { id = user.id })
    })
    //id
    it('should fail on empty id', () =>
        expect(() =>
            logic.registerCard('', cardBrand, cardType, cardNumber, expiry)
        ).to.throw('id is empty or blank')
    )

    it('should fail on undefined id', () =>
        expect(() =>
            logic.registerCard(undefined, cardBrand, cardType, cardNumber, expiry)
        ).to.throw(`id with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.registerCard(123456798, cardBrand, cardType, cardNumber, expiry)
        ).to.throw(`id with value 123456798 is not a string`)
    )

    //cardBrand
    it('should fail on empty cardBrand', () =>
        expect(() =>
            logic.registerCard('5d5d5530531d455f75da9fF9', '', cardType, cardNumber, expiry)
        ).to.throw('cardBrand is empty or blank')
    )

    it('should fail on undefined cardBrand', () =>
        expect(() =>
            logic.registerCard('5d5d5530531d455f75da9fF9', undefined, cardType, cardNumber, expiry)
        ).to.throw(`cardBrand with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.registerCard('5d5d5530531d455f75da9fF9', 12548, cardType, cardNumber, expiry)
        ).to.throw(`cardBrand with value 12548 is not a string`)
    )
    //cardType

    it('should fail on empty cardType', () =>
        expect(() =>
            logic.registerCard('5d5d5530531d455f75da9fF9', cardBrand, '', cardNumber, expiry)
        ).to.throw('cardType is empty or blank')
    )

    it('should fail on undefined cardType', () =>
        expect(() =>
            logic.registerCard('5d5d5530531d455f75da9fF9', cardBrand, undefined, cardNumber, expiry)
        ).to.throw(`cardType with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.registerCard('5d5d5530531d455f75da9fF9', cardBrand, 12548, cardNumber, expiry)
        ).to.throw(`cardType with value 12548 is not a string`)
    )
    //number
    it('should fail on empty number', () =>
        expect(() =>
            logic.registerCard('5d5d5530531d455f75da9fF9', cardBrand, cardType, '', expiry)
        ).to.throw('number is empty or blank')
    )

    it('should fail on undefined number', () =>
        expect(() =>
            logic.registerCard('5d5d5530531d455f75da9fF9', cardBrand, cardType, undefined, expiry)
        ).to.throw(`number with value undefined is not a number`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.registerCard('5d5d5530531d455f75da9fF9', cardBrand, cardType, '1245658745', expiry)
        ).to.throw(`number with value 1245658745 is not a number`)
    )
    //expiry
    it('should fail on empty expiry', () =>
        expect(() =>
            logic.registerCard('5d5d5530531d455f75da9fF9', cardBrand, cardType, cardNumber, '')
        ).to.throw('expiry is empty or blank')
    )

    it('should fail on undefined expiry', () =>
        expect(() =>
            logic.registerCard('5d5d5530531d455f75da9fF9', cardBrand, cardType, cardNumber, undefined)
        ).to.throw(`expiry with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.registerCard('5d5d5530531d455f75da9fF9', cardBrand, cardType, cardNumber, 252525)
        ).to.throw(`expiry with value 252525 is not a string`)
    )


    it('should fail if user does not exist', () => {
        return logic.registerCard('5d5d5530531d455f75da9fF9', cardBrand, cardType, cardNumber, expiry)
            .catch(({ message }) => {
                expect(message).to.equal('user with 5d5d5530531d455f75da9fF9 does not exist')
            })
    })

    it('schould add card only if user exists', () => {
        return logic.registerCard(id, cardBrand, cardType, cardNumber, expiry)
            .then(() => {
                return User.findOne({ _id: id })
                    .then(result => {
                        expect(result.id).to.exist
                    })
            })

    })

    describe('logic - add another card', () => {

        let id, cardId, name, surname, email, password, cardBrand, cardType, cardNumber, expiry

        beforeEach(() => {
            name = `g-name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`

            cardBrand = 'Visa'
            cardType = 'Credit'
            cardNumber = Math.floor(Math.random() * 9999999999999999)
            expiry = '2025-12-06'

            number2 = 1254658912561234


            return User.create({ name, surname, email, password })
                .then(user => {
                    id = user.id
                    return logic.registerCard(id, cardBrand, cardType, cardNumber, expiry)
                })

        })

        it('should fail if card number already exists', () => {
            logic.registerCard(id, cardBrand, cardType, cardNumber, expiry)
                .catch(({ message }) => {
                    expect(message).to.throw('card already exist')
                })

        })
    })
    after(() => mongoose.disconnect())
})