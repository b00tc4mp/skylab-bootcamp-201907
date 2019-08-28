const mongoose = require('mongoose')
const logic= require('../../.')
const {expect} = require('chai')
const {User, Property} = require('../../../models')

describe('logic - retrieve all properties', () => {

    before(() => mongoose.connect('mongodb://172.17.0.2/my-stuff-api-test', { useNewUrlParser: true }))
    let propertyId, propertyId2, userId, name, surname, email, password
    let address, address2, m2, m2v2, year, year2, cadastre, cadastre2
    beforeEach(()=> {
        
        address = `address-${Math.random()}`
        m2 = Number((Math.random().toFixed()))
        year = Number((Math.random()* (2019-1980) + 1980).toFixed())
        cadastre = `cadastre-${Math.random()}`
        
        address2 = `address-${Math.random()}`
        m2v2 = Number((Math.random().toFixed()))
        year2 = Number((Math.random()* (2019-1980) + 1980).toFixed())
        cadastre2 = `cadastre-${Math.random()}`
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `123-${Math.random()}`
         return Property.deleteMany()
        .then(() => 
         User.create({ name, surname, email, password }))
        .then(user => {
            
            userId= user.id
            const newProperty = new Property({ address, m2, year, cadastre})
            propertyId = newProperty.id
            newProperty.owners.push(userId)
            const newProperty2 = new Property({ address: address2, m2: m2v2, year: year2 , cadastre: cadastre2})
            propertyId2 = newProperty2.id
            newProperty2.owners.push(userId)
            return Promise.all([newProperty.save(), newProperty2.save()])
        })
        
    })
    it('should succeed on correct data', () => 
        
        logic.property.retrieveAll(userId)
          .then(properties => {
                
                expect(properties).to.exist
                expect(properties.length).to.equal(2)
                const property1 = properties.find(property => property.id.toString() === propertyId)
                const property2 = properties.find(property => property.id.toString() === propertyId2)
                expect(property1.address).to.equal(address)
                expect(property1.m2).to.equal(m2)
                expect(property1.year).to.equal(year)
                expect(property1.cadastre).to.equal(cadastre)
                expect(property2.address).to.equal(address2)
                expect(property2.m2).to.equal(m2v2)
                expect(property2.year).to.equal(year2)
                expect(property2.cadastre).to.equal(cadastre2)
                
           })
    )
    it('should fail on incorrect data', () => {
           return logic.property.retrieveAll('3123414')
             .catch(error =>{
                expect(error).to.exist
             })
    })
    it('should fail on incorrect data', () => {
        logic.property.retrieveAll('3123414')
          .catch(error =>{
             expect(error).to.exist
          })
    })
     
   
    it('should fail on empty User ID', () => 
            expect(() =>                    logic.vehicle.retrieveAll('')
        ).to.throw('User ID is empty or blank')
        )
        
        it('should fail on undefined User ID', () => 
            expect(() =>                    logic.vehicle.retrieveAll(undefined)
        ).to.throw(`User ID with value undefined is not a string`)
        )
         it('should fail on wrong data type for User ID', () => 
            expect(() => 
                              logic.vehicle.retrieveAll(123)
        ).to.throw(`User ID with value 123 is not a string`)
        )
     after(() => mongoose.disconnect())
})
