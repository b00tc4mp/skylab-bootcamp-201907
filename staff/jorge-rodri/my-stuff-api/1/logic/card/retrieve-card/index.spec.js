const { expect } = require('chai')
const logic = require('..')
const { User, Card } = require('../../../data')
const mongoose = require('mongoose')
const convertDate = require('../utils/convertDate')


describe('logic - retrieve card', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name, surname, email, password, number, expiry, card, id, idc

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

        const card = await logic.retrieveCard(id, idc)
        
        expect(card).to.exist
        expect(card._id.toString()).to.equal(idc)
    })

    after(() => mongoose.disconnect())
})