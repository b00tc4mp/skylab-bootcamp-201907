const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Property } = require('../../../models')

describe('logic - retrieve properties', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let propertyId, address, m2, year, cadastre

    beforeEach(() => {

        address = `proaddr-${Math.random()}`
        m2 = Number((Math.random()*1000).toFixed())
        year = Number((Math.random()*1000).toFixed())
        cadastre = `cadaddr-${Math.random()}`

        return Property.deleteMany()
            .then(() => {
                name = `name-${Math.random()}`
                surname = `surname-${Math.random()}`
                email = `email-${Math.random()}@email.com`
                password = `123-${Math.random()}`

                return User.create({ name, surname, email, password })
            })
            .then(() => Property.create({ address, m2, year, cadastre }))

            .then(property => propertyId = property.id)
    })
    it('should succeed on correct data', () =>
        logic.property.retrieveAll(propertyId)
            .then(properties => { 
                expect(properties).to.exist
                expect(properties.id).to.equal(propertyId)
                expect(properties.address).to.equal(address)
                expect(properties.m2).to.equal(m2)
                expect(properties.year).to.equal(year)
                expect(properties.cadastre).to.equal(cadastre)
            })
    ) 

    it('should fail if the id is not a string', () => 
        expect(() => logic.property.retrieveAll(1234).to.throw(`property with id ${1234} does not exist`))
    )

    after(() => mongoose.disconnect())
})