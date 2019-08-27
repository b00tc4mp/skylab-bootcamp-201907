const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Property } = require('../../../models')

describe('logic - register property', () => {

    before(() => mongoose.connect('mongodb://172.17.0.2/my-api-test', { useNewUrlParser: true }))

    let userId, propertyId, address, m2, year, cadastre

    beforeEach(() => {

        address = `address-${Math.random()}`
        m2 = Number((Math.random() * (250 - 45) + 45).toFixed())
        year = Number((Math.random() * (2019-1980) + 1980).toFixed())
        cadastre = `cadastre-${Math.random()}`

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `password-${Math.random()}`

        return User.create({ name, surname, email, password })
            .then(user => {
                userId = user.id
                const newProperty = new Property({ address, m2, year, cadastre })
                propertyId = newProperty.id
                newProperty.owners.push(userId)
                return newProperty.save()
            })
    })

    it('should succeed on correct data', () =>
        logic.property.retrieve(propertyId)
            .then(property => {
                expect(property).to.exist
                expect(property.address).to.equal(address)
                expect(property.m2).to.equal(m2)
                expect(property.year).to.equal(year)
                expect(property.cadastre).to.equal(cadastre)
            })
    )

    it('should fail if the property does not exist', () =>
        Property.deleteMany()
        .then(() => {
            logic.property.retrieve(propertyId)
            .catch( error =>{
                   expect(error).to.exist
                   expect(error.message).to.equal(`Property with id ${propertyId} does not exist.`)
               })
        })
   )

    /* Make */
    it('should fail on empty id', () => 
        expect(() => 
               logic.property.retrieve('')
    ).to.throw('Property ID is empty or blank')
    )

     it('should fail on undefined id', () => 
        expect(() => 
               logic.property.retrieve(undefined)
    ).to.throw(`Property ID with value undefined is not a string`)
    )

     it('should fail on wrong data type for id', () => 
        expect(() => 
               logic.property.retrieve(123)
    ).to.throw(`Property ID with value 123 is not a string`)
    )

})