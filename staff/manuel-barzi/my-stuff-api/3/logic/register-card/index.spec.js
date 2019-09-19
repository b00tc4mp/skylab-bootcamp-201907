require('dotenv').config()

const { expect } = require('chai')
const registerCard = require('.')
const { random: { number } } = require('my-stuff-utils')
const { database, models: { User } } = require('my-stuff-data')

const { env: { DB_URL_TEST } } = process

describe('logic - register card', () => {
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
        id = user.id
    })

    it('should succeed on correct data', async () => {
        const _id = await registerCard(id, _number, expiry)

        cardId = _id

        const user = await User.findById(id)

        expect(user).to.exist

        const { cards } = user

        expect(cards).to.have.lengthOf(1)

        const [card] = cards

        expect(card).to.exist
        expect(card.number).to.equal(_number)
        expect(card.expiry).to.deep.equal(expiry)
    })

    after(() => database.disconnect())
})