const { expect } = require('chai')
const logic = require('..')
const { Property, User } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - register property', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name, surname, email, password, id, year, address, m2, cadastre, owners


    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        return User.deleteMany()
            .then(() => User.create({ name, surname, email, password }))
            .then(user => id = user.id)
    })

    beforeEach(() => {
        address = `address-${Math.random()}`
        m2 = Math.random()
        year = Math.random()*2016
        cadastre = `cadastre-${Math.random()}`
        owners = [id, '5d61bea73f43d1169c917202']
        return Property.deleteMany()

    })

    it('should succeed on correct data', () =>
        logic.registerProperty(address, m2, year, cadastre, owners)
            .then(result => { 
                expect(result).not.to.exist

                return Property.findOne({ cadastre })
            })
            .then(property => { 
                expect(property).to.exist
                expect(property.address).to.equal(address)
                expect(property.m2).to.equal(m2)
                expect(property.year).to.equal(year)
                expect(property.cadastre).to.equal(cadastre)
                expect(property.owners[0].toString()).to.equal(owners[0])
            })
    )
    after(() => mongoose.disconnect())
})