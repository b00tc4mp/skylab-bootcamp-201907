const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Property } = require('../../../models')

describe('logic - unregister owner from property', () => {

    before(() => mongoose.connect('mongodb://localhost/my-stuff-api-test', { useNewUrlParser: true }))

    let userId, propertyId,  address, m2, year, cadastre
    let name, surname, email, password
    let name2, surname2, email2, password2
    let userOneId, userTwoId

    beforeEach(() => {

        address = `address-${Math.random()}`
        m2 = Number((Math.random() * (250 - 45) + 45).toFixed())
        year = Number((Math.random() * (2019-1980) + 1980).toFixed())
        cadastre = `cadastre-${Math.random()}`

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `password-${Math.random()}`

        name2 = `name-${Math.random()}`
        surname2 = `surname-${Math.random()}`
        email2 = `email-${Math.random()}@email.com`
        password2 = `password-${Math.random()}`

        const userOne = new User({ name, surname, email, password })
        userOneId = userOne.id
        const userTwo = new User({ name: name2, surname: surname2, email: email2, password: password2 })
        userTwoId = userTwo.id
        const newProperty = new Property({ address, m2, year, cadastre })
        propertyId = newProperty.id
        newProperty.owners.push(userOneId)
        newProperty.owners.push(userTwoId)
        return Promise.all([userOne.save(), userTwo.save(), newProperty.save()])
    })

    it('should succeed on correct data', () => {
        return logic.property.unregisterOwner(propertyId, userTwoId)
            .then(response => {
                expect(response).not.to.exist
                return Property.findById(propertyId)
                    .then(property => {
                        const match = property.owners.find(owner =>owner.id === userTwoId)
                        expect(match).not.to.exist
                })
            })
        }
    )

    it('should fail if property does not exist', () => {
        return Property.deleteMany()
        .then(() => logic.property.unregister(propertyId))
        .catch(error =>{
                expect(error).to.exist
                expect(error.message).to.equal(`Property with id ${propertyId} does not exist.`)
        })
    })


    /* Property ID */
    it('should fail on empty User ID', () => 
        expect(() => 
               logic.property.unregisterOwner('', userTwoId)
    ).to.throw('Property ID is empty or blank')
    )

     it('should fail on undefined User ID', () => 
        expect(() => 
               logic.property.unregisterOwner(undefined, userTwoId)
    ).to.throw(`Property ID with value undefined is not a string`)
    )

     it('should fail on wrong data type for id', () => 
        expect(() => 
               logic.property.unregisterOwner(123, userTwoId)
    ).to.throw(`Property ID with value 123 is not a string`)
     )

    /* Owner ID */
    it('should fail on empty Owner ID', () => 
        expect(() => 
               logic.property.unregisterOwner(propertyId, '')
    ).to.throw('Owner ID is empty or blank')
    )

     it('should fail on undefined Owner ID', () => 
        expect(() => 
               logic.property.unregisterOwner(propertyId, undefined)
    ).to.throw(`Owner ID with value undefined is not a string`)
    )

     it('should fail on wrong data type for Owner ID', () => 
        expect(() => 
               logic.property.unregisterOwner(propertyId, 123)
    ).to.throw(`Owner ID with value 123 is not a string`)
     )


    after(() => mongoose.disconnect())
    
})