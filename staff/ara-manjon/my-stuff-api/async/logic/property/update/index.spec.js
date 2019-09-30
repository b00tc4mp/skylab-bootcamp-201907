const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Property } = require('../../../data')


describe('logic - update property', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test',  { useNewUrlParser: true }))

    let id, address, m2, year, cadastre

    beforeEach(() => {

        address = `address-${Math.random()}`
        m2 = Number((Math.random()*500).toFixed())
        year = Number((Math.random()*1000).toFixed())
        cadastre = `cadastre-${Math.random()}`

        body = {
            address : `newAddress-${Math.random()}`,
            m2: Number((Math.random()*1000).toFixed())
        }
        
        return Property.deleteMany()
        .then(()=>{
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        return User.create({ name, surname, email, password })

    })
    .then(() => Property.create({ address, m2, year, cadastre }))

    .then(property => id = property.id)

    })
    it('should succeed on correct data', () =>
        logic.property.update(id, body)
            .then(result => {
                expect(result).not.to.exist

                return Property.findById(id)
            })
            .then(property => {
                expect(property).to.exist
                expect(property.color).to.equal(body.color)
                expect(property.extra).to.equal(body.extra) 
            })
    )

     it('should fail on non-existing property', () => {
        id = '5d5d5530531d455f75da9fF9'

        return logic.property.update(id, body )
            .then(() => { throw new Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal(`property with id ${id} does not exist`))
    }) 

    after(() => mongoose.disconnect())
})