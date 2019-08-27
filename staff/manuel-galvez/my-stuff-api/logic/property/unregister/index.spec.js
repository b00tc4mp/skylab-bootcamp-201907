const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Property } = require('../../../models')

describe('logic - register property', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let userId, propertyId,  address, m2, year, cadastre

    beforeEach(() => {

        address = `address-${Math.random()}`
        m2 = Number((Math.random() * (250 - 45) + 45).toFixed())
        year = Number((Math.random() * (2019-1980) + 1980).toFixed())
        cadastre = `cadastre-${Math.random()}`

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `password-${Math.random()}`

        const newUser = new User({ name, surname, email, password })
        userId = newUser.id
        const newProperty = new Property({ address, m2, year, cadastre })
        propertyId = newProperty.id
        newProperty.owners.push(userId)
        return Promise.all([newUser.save(), newProperty.save()])
    })

    it('should succeed on correct data', () =>
        logic.property.unregister(propertyId)
            .then(response => {
                expect(response).not.to.exist
                return Property.findById(propertyId)
                    .then(response => {
                        expect(response).not.to.exist
                })
            })
    )

    it('should fail if property does not exist', () => {
        return Property.deleteMany()
        .then(() => logic.property.unregister(propertyId))
        .catch(error =>{
                expect(error).to.exist
                expect(error.message).to.equal(`Property with id ${propertyId} does not exist.`)
        })
    })

    /* USER ID */
    it('should fail on empty User ID', () => 
        expect(() => 
               logic.property.unregister('')
    ).to.throw('Property ID is empty or blank')
    )

     it('should fail on undefined User ID', () => 
        expect(() => 
               logic.property.unregister(undefined)
    ).to.throw(`Property ID with value undefined is not a string`)
    )

     it('should fail on wrong data type for id', () => 
        expect(() => 
               logic.property.unregister(123)
    ).to.throw(`Property ID with value 123 is not a string`)
     )

})
