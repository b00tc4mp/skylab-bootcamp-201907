const { expect } = require('chai')
const logic = require('..')
const { User, Card } = require('../../../data')
const mongoose = require('mongoose')


describe('logic - register card', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name, surname, email, password, number, expiry, card, id

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        card = []
        number = `${Math.random()}`
        expiry = '05/10'

        await User.deleteMany()
        const user = await User.create({ name, surname, email, password, card })
        id = user.id
    })


    it('should succeed on correct data', async () => {

        const user = await logic.registerCard(id, number, expiry)
        
        expect(user.card).to.exist
        
        expect(user.card[0].number).to.equal(number)
    })
    after(() => mongoose.disconnect())
})