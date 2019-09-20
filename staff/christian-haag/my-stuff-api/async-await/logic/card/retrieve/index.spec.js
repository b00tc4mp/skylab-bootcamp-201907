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

    beforeEach(async () => {
        name = `C-name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        cardBrand = cardArr[rand]
        cardType = Math.random() >= 0.5 ? 'Credit' : 'Debit'
        number = Math.floor(Math.random() * 9999999999999999)
        expiry = new Date()


        const user = await User.create({ name, surname, email, password })

        userId = user.id

        cardId = await logic.registerCard(userId, cardBrand, cardType, number, expiry)

    })

    it('should fail on empty id', () =>
        expect(() =>
            logic.retrieveCard('', cardId)
        ).to.throw('userId is empty or blank')
    )

    it('should fail on undefined id', () =>
        expect(() =>
            logic.retrieveCard(undefined, cardId)
        ).to.throw(`userId with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.retrieveCard(123456798, cardId)
        ).to.throw(`userId with value 123456798 is not a string`)
    )

    it('should fail on empty cardId', () =>
        expect(() =>
            logic.retrieveCard(userId, '')
        ).to.throw('cardId is empty or blank')
    )

    it('should fail on undefined cardId', () =>
        expect(() =>
            logic.retrieveCard(userId, undefined)
        ).to.throw(`cardId with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.retrieveCard(userId, 123456798)
        ).to.throw(`cardId with value 123456798 is not a string`)
    )

    it('schould retireve card by id', async () => {
        const _card = await logic.retrieveCard(userId, cardId)
        expect(_card).to.exist
        expect(_card.id).to.equal(cardId)
    })

    after(() => mongoose.disconnect())
})
