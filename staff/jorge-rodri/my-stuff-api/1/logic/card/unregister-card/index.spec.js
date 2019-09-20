const { expect } = require('chai')
const logic = require('..')
const { User, Card } = require('../../../data')
const mongoose = require('mongoose')
const convertDate = require('../utils/convertDate')


describe('logic - unregister card', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name, surname, email, password, number, expiry, card, id

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        card = []
        number = `${Math.random()}`
        expiry = convertDate('05/10')

        await User.deleteMany()

        const user = await User.create({ name, surname, email, password, card })

        id = user.id

        const _card = new Card({ number, expiry })

        user.card.push(_card)

        await user.save()

        idc = user.card[0].id

        return user
    })

    it('should succeed on correct data', async () => {
        const user = await logic.unregisterCard(id, idc)

        expect(user.card).to.exist
        expect(user.card.length).to.equal(0)
    })
    after(() => mongoose.disconnect())
})