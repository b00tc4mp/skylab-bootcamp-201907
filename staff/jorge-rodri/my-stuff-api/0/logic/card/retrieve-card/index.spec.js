const { expect } = require('chai')
const logic = require('..')
const { User, Card } = require('../../../data')
const mongoose = require('mongoose')
const convertDate = require('../utils/convertDate')


describe('logic - retrieve card', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name, surname, email, password, number, expiry, card, id, idc

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        card = []
        number = `${Math.random()}`
        expiry = convertDate('05/10')
        

        return User.deleteMany()
            .then(() => User.create({ name, surname, email, password, card }))
            .then((user) => {
                id = user.id
                
                const _card = new Card({ number, expiry })
                
                user.card.push(_card)
                return user.save()
            })
            .then(card => {
                idc = card.card[0].id
                
            })
    })


    it('should succeed on correct data', () => 

        logic.retrieveCard(id, idc)
            .then(card => {
                expect(card).to.exist
                expect(card._id.toString()).to.equal(idc)
            })
    )

    after(() => mongoose.disconnect())
}) 