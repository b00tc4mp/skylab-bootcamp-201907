require('dotenv').config()

const { expect } = require('chai')
const retrieveCards = require('.')
const { database, models: { User, Card } } = require('../../data')
const { number } = require('../../utils/random')

const { env: { DB_URL_TEST } } = process

describe('logic - retrieve cards', () => {
    before(() => database.connect(DB_URL_TEST))

    let name, surname, email, password, id, cards

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        cards = []

        for (let j = 0; j < 3; j++) {
            let _number = 0
            for (let i = 0; i < 16; i++)
                _number += number(0, 9) * (10 ** (i + 1))

            const expiry = new Date

            cards.push(new Card({ number: _number, expiry }))
        }

        await User.deleteMany()

        const user = await User.create({ name, surname, email, password })

        user.cards = cards

        await user.save()

        id = user.id
    })

    it('should succeed on correct data', async () => {
        const _cards = await retrieveCards(id)

        expect(_cards).to.exist
        expect(_cards).to.have.lengthOf(cards.length)

        for (const card of _cards) {
            const _card = cards.find(({ id }) => id === card.id)

            expect(_card).to.exist
            expect(card.number).to.equal(_card.number)
            expect(card.expiry).to.deep.equal(_card.expiry)
        }
    })

    after(() => database.disconnect())
})