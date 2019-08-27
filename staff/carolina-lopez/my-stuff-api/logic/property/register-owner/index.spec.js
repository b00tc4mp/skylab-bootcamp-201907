const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Property } = require('../../../models')

describe('logic - register owner', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let address, m2, year, cadastre, id, propertyId

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
            .then(user => id = user._id.toString())
    })

    it('should succeed on correct data', () =>
        logic.property.registerOwner(id, address, m2, year, cadastre)
            .then(result => {
                propertyId = result
                expect(propertyId).to.exist
                return Property.findOne({ cadastre })
            })
            .then(property => {
                expect(property).to.exist
                expect(property.id).to.equal(propertyId)
                expect(property.address).to.equal(address)
                expect(property.m2).to.equal(m2)
                expect(property.year).to.equal(year)
                expect(property.cadastre).to.equal(cadastre)
            })
    )

    it('should fail if the property already exists', () =>
       Property.create({ address, m2, year, cadastre })
           .then (() => logic.property.register(id, address, m2, year, cadastre)
               .catch( error =>{
                   expect(error).to.exist
                   expect(error.message).to.equal(`Property already exists.`)
               })
           )
    )

    /* Following 3 tests 
    for every parameter passed to logic */

    it('should fail on empty address', () => 
        expect(() => 
               logic.property.register(id, ' ', m2, year, cadastre)
    ).to.throw('address is empty or blank')
    )

     it('should fail on undefined address', () => 
        expect(() => 
               logic.property.register(id, undefined, m2, year, cadastre)
    ).to.throw(`address with value undefined is not a string`)
    )

     it('should fail on wrong data type', () => 
        expect(() => 
               logic.property.register(id, 123, m2, year, cadastre)
    ).to.throw(`address with value 123 is not a string`)
    )

    after(() => mongoose.disconnect())
})