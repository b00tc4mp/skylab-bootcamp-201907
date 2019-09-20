const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Property } = require('../../../models')

describe('logic - retrieve all properties', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let propertyId1, address1, m21, year1, cadastre1
    let propertyId2, address2, m22, year2, cadastre2

    let name, surname, email, password, userId


    beforeEach(() => {

        address1 = `proaddr-${Math.random()}`
        m21 = Number((Math.random()*1000).toFixed())
        year1 = Number((Math.random()*1000).toFixed())
        cadastre1 = `cadaddr-${Math.random()}`

        address2 = `proaddr-${Math.random()}`
        m22 = Number((Math.random()*1000).toFixed())
        year2 = Number((Math.random()*1000).toFixed())
        cadastre2 = `cadaddr-${Math.random()}`


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
            .then(() => {
                return Property.create({ address: address1, m2: m21, year: year1, cadastre: cadastre1, 'owner': userId })
                .then(property => { propertyId1 = property.id })
            })

            .then(() => {
                return Property.create({ address: address2, m2: m22, year: year2, cadastre: cadastre2, 'owner': userId })
                .then(property => { propertyId2 = property.id})
            })
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