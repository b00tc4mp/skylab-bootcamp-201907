require('dotenv').config()

const { expect } = require('chai')
const retrieveCard = require('.')
const { database, models: { User, Card } } = require('my-stuff-data')
const { random: { number } } = require('my-stuff-utils')

const { env: { DB_URL_TEST } } = process

describe('logic - retrieve card', () => {
    before(() => database.connect(DB_URL_TEST))

    let name, surname, email, password, id, _number, expiry, cardId

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        _number = 0
        for (let i = 0; i < 16; i++)
            _number += number(0, 9) * (10 ** (i + 1))

        expiry = new Date

        await User.deleteMany()

        const user = await User.create({ name, surname, email, password })

        const card = new Card({ number: _number, expiry })

        cardId = card.id

        user.cards.push(card)

        await user.save()

        id = user.id
    })

    it('should succeed on correct data', async () => {
        const card = await retrieveCard(id, cardId)

        expect(card).to.exist
        expect(card.id).to.equal(cardId)
        expect(card.number).to.equal(_number)
        expect(card.expiry).to.deep.equal(expiry)
    })

    after(() => database.disconnect())
})