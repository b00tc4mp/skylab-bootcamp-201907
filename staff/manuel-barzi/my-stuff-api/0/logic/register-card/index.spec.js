const { expect } = require('chai')
const logic = require('..')
const { number } = require('../../utils/random')
const { database, models: { User } } = require('../../data')

describe('logic - register card', () => {
    before(() => database.connect('mongodb://localhost/my-api-test'))

    let name, surname, email, password, id, _number, expiry, cardId

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        _number = 0
        for (let i = 0; i < 16; i++)
            _number += number(0, 9) * (10 ** (i + 1))

        expiry = new Date

        return User.deleteMany()
            .then(() => User.create({ name, surname, email, password }))
            .then(user => id = user.id)
    })

    it('should succeed on correct data', () =>
        logic.registerCard(id, _number, expiry)
            .then(_id => {
                cardId = _id

                return User.findById(id)
            })
            .then(user => {
                expect(user).to.exist

                const { cards } = user

                expect(cards).to.have.lengthOf(1)

                const [card] = cards

                expect(card).to.exist
                expect(card.number).to.equal(_number)
                expect(card.expiry).to.deep.equal(expiry)
            })
    )

    after(() => database.disconnect())
})