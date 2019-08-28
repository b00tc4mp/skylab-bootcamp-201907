const { expect } = require('chai')
const logic = require('../../.')
const { day, month, year } = require('../../../utils/random-date')
const { User } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - add card', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let id, name, surname, email, password, cardBrand, cardType, cardNumber, expiry

    beforeEach(async () => {
        name = `C-name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        cardBrand = 'Visa'
        cardType = 'Credit'
        cardNumber = Math.floor(Math.random() * 9999999999999999)
        expiry = new Date

        await User.deleteMany()
        const user = await User.create({ name, surname, email, password })
        id = user.id
    })

    //validations

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
        ).to.throw(`expiry with value undefined is not a valid date`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.registerCard('5d5d5530531d455f75da9fF9', cardBrand, cardType, cardNumber, 252525)
        ).to.throw(`expiry with value 252525 is not a valid date`)
    )


    it('should fail if user does not exist', async () => {
        try {
            await logic.registerCard('5d5d5530531d455f75da9fF9', cardBrand, cardType, cardNumber, expiry)
        } catch ({ message }) {
            expect(message).to.equal('user with id 5d5d5530531d455f75da9fF9 does not exist')
        }
    })

    it('schould add card only if user exists', async () => {

        await logic.registerCard(id, cardBrand, cardType, cardNumber, expiry)

        const user = await User.findOne({ _id: id }).lean()
        expect(user).to.exist
        const { cards } = user

        expect(cards).to.have.lengthOf(1)

        const [card] = cards
        expect(card.number).to.equal(cardNumber)
        expect(card.expiry).to.deep.equal(expiry)
    })


    describe('logic - add another card', () => {

        let id, name, surname, email, password, cardBrand, cardType, cardNumber, expiry

        beforeEach(async () => {
            name = `g-name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`

            cardBrand = 'Visa'
            cardType = 'Credit'
            cardNumber = Math.floor(Math.random() * 9999999999999999)
            expiry = new Date

            number2 = 1254658912561234

            const user = await User.create({ name, surname, email, password })
            id = user.id
            await logic.registerCard(id, cardBrand, cardType, cardNumber, expiry)
        })


        it('should add a second card', async () => {

            await logic.registerCard(id, cardBrand, cardType, number2, expiry)

            const user = await User.findOne({ _id: id }).lean()

            const { cards } = user

            expect(cards).to.have.lengthOf(2)

            const [card1, card2] = cards

            expect(card1).to.exist
            expect(card2).to.exist
            expect(card2.number).to.equal(number2)

        })

    })

    describe('logic - fail to add card', () => {

        let id, name, surname, email, password, cardBrand, cardType, cardNumber, expiry

        beforeEach(async () => {
            name = `g-name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`

            cardBrand = 'Visa'
            cardType = 'Credit'
            cardNumber = Math.floor(Math.random() * 9999999999999999)
            expiry = new Date

            number2 = 1254658912561234


            const user = await User.create({ name, surname, email, password })
            id = user.id
            await logic.registerCard(id, cardBrand, cardType, number2, expiry)


        })

        it('should fail if card number already exists', async () => {

            try {
                await logic.registerCard(id, cardBrand, cardType, number2, expiry)
            } catch ({ message }) {
                expect(message).to.equal('card number 1254658912561234 already exist')
            }

        })
    })
    after(() => mongoose.disconnect())
})