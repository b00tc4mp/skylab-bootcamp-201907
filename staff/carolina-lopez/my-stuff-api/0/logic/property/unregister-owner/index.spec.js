const mongoose = require('mongoose')
const logic = require('../..')
const { expect } = require('chai')
const { User, Property } = require('../../../models')


describe('logic - unregister owner', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))
    
    let propertyId, ownerId1, ownerId2
    let address, m2, year, cadastre
    let name, surname, email, password
    let name2, surname2, email2, password2
    
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
                
                name2 = `name-${Math.random()}`
                surname2 = `surname-${Math.random()}`
                email2 = `email-${Math.random()}@email.com`
                password2 = `123-${Math.random()}`
                
                const user1 = new User({ name, surname, email, password })
                ownerId1= user1.id

                const user2 = new User({ name: name2, surname: surname2,email: email2, password: password2 })
                ownerId2= user2.id

                
                const property = new Property({ address, m2, year, cadastre })
                propertyId = property.id
                property.owners.push(ownerId1, ownerId2)
                return Promise.all([user1.save(), user2.save(), property.save()])
            })
    })

    it('should succeed on correct data', () => 
        logic.propertyUnregisterOwner(propertyId, ownerId1) 
            .then(property => {
                expect(property).to.exist

            })
    )
    after(() => mongoose.disconnect())
})