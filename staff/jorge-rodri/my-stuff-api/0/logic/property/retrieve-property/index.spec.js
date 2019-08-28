const { expect } = require('chai')
const logic = require('..')
const { Property, User } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - retrieve property', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true, useUnifiedTopology:true }))

    let name, surname, email, password, idU, year, address, m2, cadastre, owners

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        return User.deleteMany()
            .then(() => User.create({ name, surname, email, password }))
            .then(user => idU = user.id)
    })

    beforeEach(() => {
        address = `address-${Math.random()}`
        m2 = Math.random()
        year = Math.random() * 2016
        cadastre = `cadastre-${Math.random()}`
        owners = [idU] 

        return Property.deleteMany()
            .then(() => Property.create({ address, m2, year, cadastre, owners }))
            .then(property => idP = property.id)
    })

    it('should succeed on correct data', () => {
        logic.retrieveProperty(idU)
            .then(property => {debugger
                expect(property).to.exist
                expect(property._id.toString()).to.equal(idP)
                expect(property.address).to.equal(address)
                expect(property.m2).to.equal(m2)
                expect(property.year).to.equal(year)
                expect(property.cadastre).to.equal(cadastre)
                expect(property.owners).to.exist
            })
    }
    )
    after(() => mongoose.disconnect())

})