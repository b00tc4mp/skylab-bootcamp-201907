const { expect } = require('chai')
const logic = require('..')
const { User, Card } = require('../../../data')
const mongoose = require('mongoose')


describe('logic - register card', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name, surname, email, password, number, expiry, card, id

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        card = []
        number = `${Math.random()}`
        expiry = '05/10'
        
        return User.deleteMany()
            .then(() => User.create({ name, surname, email, password, card }))
            .then((user) =>  id = user.id)
    })


    it('should succeed on correct data', () =>{
        
        logic.registerCard(id, number, expiry)
            .then( user => {
                expect(user.card).to.exist
                expect(user.card.number).to.equal(number)
            })
    })

    after(() => mongoose.disconnect())
}) 