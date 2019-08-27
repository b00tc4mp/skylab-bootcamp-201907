const { expect } = require('chai')
const logic = require('../../.')
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

    it('should fail if user does not exist', async () => {
        try {
            await logic.cardRegister('5d5d5530531d455f75da9fF9', cardBrand, cardType, cardNumber, expiry)
        } catch ({ message }) {
            expect(message).to.throw('user with id 5d5d5530531d455f75da9fF9 does not exist')
        }

    })

    it('schould add card only if user exists', async () => {

        await logic.cardRegister(id, cardBrand, cardType, cardNumber, expiry)

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
            await logic.cardRegister(id, cardBrand, cardType, cardNumber, expiry)


        })

        it('should add a second card', async () => {

            await logic.cardRegister(id, cardBrand, cardType, number2, expiry)

            const user = await User.findOne({ _id: id }).lean()

            const { cards } = user

            expect(cards).to.have.lengthOf(2)

            const [card1, card2] = cards

            expect(card1).to.exist
            expect(card2).to.exist
            expect(card2.number).to.equal(number2)

        })


        it('should fail if card number already exists', async () => {

            try {
                await logic.cardRegister(id, cardBrand, cardType, cardNumber, expiry)

            } catch ({ message }) {
                expect(message).to.throw('user with id ${id} already has card number ${number}')
            }


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
            await User.findOneAndUpdate(id, { $set: { _id: 1254658912561234 } })
            id = user.id
            await logic.cardRegister(id, cardBrand, cardType, cardNumber, expiry)


        })

        it('should fail if card number already exists', async () => {

            try {
                await logic.cardRegister(id, cardBrand, cardType, cardNumber, expiry)

            } catch (error) {
                expect(error).to.throw('user with id 5d5d5530531d455f75da9fF9 already has card number 1254658912561234')
            }


        })
    })
    after(() => mongoose.disconnect())
})