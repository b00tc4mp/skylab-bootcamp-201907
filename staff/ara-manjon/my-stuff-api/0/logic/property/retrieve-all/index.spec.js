const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Property } = require('../../../data')

describe('logic - retrieve all properties', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))
    let propertyId, address, m2, year, cadastre
    let name, surname, email, password, userId
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
                return User.deleteMany() //delete old users
            .then(() => { //creating a user
                return User.create({ name, surname, email, password })
                    .then(user => userId = user.id)
            })
               
            })
            .then(() => Property.create({ address, m2, year, cadastre }))
            .then(property => propertyId = property.id)
    })
    it('should succeed on correct data', () =>
        logic.property.retrieveAll(userId)
            .then(property => { 
                expect(property).to.exist
            })
    ) 
    it('should fail if the id is not a string', () => 
        expect(() => logic.property.retrieveAll(1234).to.throw(`property with id ${1234} does not exist`))
    )
    after(() => mongoose.disconnect())
})