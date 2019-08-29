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



        const card = await Card.create({ cardBrand, cardType, number, expiry })
        cardId = card.id

    })

    it('should fail on empty id', () =>
        expect(() =>
            logic.unregisterCard('')
        ).to.throw('id is empty or blank')
    )

    it('should fail on undefined id', () =>
        expect(() =>
            logic.unregisterCard(undefined)
        ).to.throw(`id with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.unregisterCard(123456798)
        ).to.throw(`id with value 123456798 is not a string`)
    )


    it('schould delete card by id', async () => {

        const _card = await logic.unregisterCard(cardId)
        expect(_card).to.undefined

    })

    after(() => mongoose.disconnect())
})
