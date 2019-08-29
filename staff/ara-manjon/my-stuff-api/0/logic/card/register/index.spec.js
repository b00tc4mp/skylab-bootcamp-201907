const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User} = require('../../../data')

describe('logic - register card', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test',  { useNewUrlParser: true }))
    let name, surname, email, password, id, _number, expiry, cardId
    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `123-${Math.random()}`
        
        _number = Math.random()
        expiry = new Date()
        /*let date = new Date()
        expiry = `${(("0" + (date.getMonth() + 1)).slice(-2)) + '/' + (date.getFullYear()).toString().substr(-2)}`*/
        return User.deleteMany()
            .then(() => User.create({ name, surname, email, password }))
            .then(user => id = user.id)
    })
    it('should succeed on correct data', () =>
        logic.card.register(id, _number, expiry)
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
    after(() => mongoose.disconnect())
})