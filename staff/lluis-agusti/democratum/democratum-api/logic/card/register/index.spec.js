const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User } = require('../../../models')

describe('logic - register card', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test',  { useNewUrlParser: true }))

    let name, surname, email, password, id, _number, expiry, cardId

    beforeEach( async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `123-${Math.random()}`
        
        _number = Math.random()
        expiry = new Date()
        /*let date = new Date()
        expiry = `${(("0" + (date.getMonth() + 1)).slice(-2)) + '/' + (date.getFullYear()).toString().substr(-2)}`*/

        await User.deleteMany()
        const user = await User.create({ name, surname, email, password })
        id = user.id
    })

    it('should succeed on correct data', async () => {
        const _id = await logic.card.register(id, _number, expiry)
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



    /* it('should fail on unexisting card', () =>
        logic.card.register('5d5d5530531d455f75da9fF9')
            .then(() => { throw Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal('wrong credentials'))
    ) */

    after(() => mongoose.disconnect())
})