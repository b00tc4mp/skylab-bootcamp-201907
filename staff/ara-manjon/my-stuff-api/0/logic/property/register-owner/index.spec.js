const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Property } = require('../../../data')

describe('logic - register owner', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let propertyId, ownerId, registerdOwner, property

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
                .then(user => ownerId= user.id)
            })
            .then(() => {
                property = new Property({ address, m2, year, cadastre })
                propertyId = property.id
                property.owners.push(ownerId)
                return property.save()
            })
    })

    it('should succeed on correct data', () =>
        logic.property.registerOwner(propertyId, ownerId)
             .then(property =>{
                 registerdOwner = property.owners.find(owner => owner.toString() === ownerId)
                expect(registerdOwner).to.exist
                return Property.findOne({_id: propertyId})


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

     it('should fail if the user already exists', () =>{
        property.owners.push(ownerId)
        logic.property.registerOwner(propertyId, ownerId)
               .catch( error =>{
                   expect(error).to.exist
                   expect(error.message).to.equal(`Owner already registered in property with id ${propertyId}`)
               })}
           )

     it('should fail on wrong property id provided', () =>{
        logic.property.registerOwner('propertyId', ownerId)
               .catch( error =>{
                   expect(error).to.exist
                   expect(error.message).to.equal('Wrong property id provided.')
               })}
           )

     it('should fail on wrong owner id provided', () =>{
        logic.property.registerOwner(propertyId, 'ownerId')
               .catch( error =>{
                   expect(error).to.exist
                   expect(error.message).to.equal('Wrong owner id provided.')
               })}
           )
    

    it('should fail on empty property id', () => 
        expect(() => 
               logic.property.registerOwner('', ownerId)
    ).to.throw('Property id is empty or blank')
    )
    
    it('should fail on empty owner id', () => 
        expect(() => 
               logic.property.registerOwner(propertyId, '')
    ).to.throw('Owner id is empty or blank')
    )

    it('should fail on property id is not a string', () => 
        expect(() => 
               logic.property.registerOwner(123, ownerId)
    ).to.throw('Property id with value 123 is not a string')
    )

    it('should fail on owner id is not a string', () => 
        expect(() => 
               logic.property.registerOwner(propertyId, 123)
    ).to.throw('Owner id with value 123 is not a string')
    )

    after(() => mongoose.disconnect())
})

