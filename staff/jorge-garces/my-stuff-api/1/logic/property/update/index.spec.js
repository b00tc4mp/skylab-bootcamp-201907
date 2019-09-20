const mongoose = require('mongoose')
const { expect } = require('chai')
const logic = require('../../../logic')
const { User, Property } = require('../../../models')

describe('logic', () => {
    before(() => {
        mongoose.connect('mongodb://172.17.0.2/my-stuff-api-test', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    })
    beforeEach(() => User.deleteMany())
    describe('update property', () => {
        let name, surname, email, password, address, m2, year, cadastre
        beforeEach(() => User.deleteMany())

        let userId, propertyId

        describe('update: property', () => {
            beforeEach(() => {
                name = `name-${Math.random()}`
                surname = `surname-${Math.random()}`
                email = `email-${Math.random()}@domain.com`
                password = `password-${Math.random()}`

                address = `address-${Math.random()}`
                m2 = Number((Math.random() * (250 - 80) + 80).toFixed())
                year = Number((Math.random() * (2019 - 1980) + 1980).toFixed())
                cadastre = `cadastre-${Math.random()}`

                const newUser = new User({ name, surname, email, password })
                userId = newUser.id
                const newProperty = new Property({ address, m2, year, cadastre })
                propertyId = newProperty.id
                newProperty.owners.push(userId)
                return Promise.all([newUser.save(), newProperty.save()])
            })

            it('should update property info on correct data', async () => {
                try {
                    await logic.property.update(propertyId, { address: 'newAddress', m2: 999 })
                    const response = await Property.findOne({ _id: propertyId })
                    expect(response.m2).to.equal(999)
                } catch (error) { expect(error).not.to.exist }
            })

            it('should fail on address being an array', () => {
                expect(() => logic.property.update(propertyId, { address: [] })).to.throw(Error)
            })
            it('should fail on address being a function', () => {
                expect(() => logic.property.update(propertyId, { address: function () { } })).to.throw(Error)
            })
            it('should fail on address being a number', () => {
                expect(() => logic.property.update(propertyId, { address: 123 })).to.throw(Error)
            })
            it('should fail on address being a boolean', () => {
                expect(() => logic.property.update(propertyId, { address: true })).to.throw(Error)
            })
            it('should fail on m2 being an array', () => {
                expect(() => logic.property.update(propertyId, { m2: [] })).to.throw(Error)
            })
            it('should fail on m2 being a function', () => {
                expect(() => logic.property.update(propertyId, { m2: function () { } })).to.throw(Error)
            })
            it('should fail on m2 being a string', () => {
                expect(() => logic.property.update(propertyId, { m2: '123' })).to.throw(Error)
            })
            it('should fail on m2 being a boolean', () => {
                expect(() => logic.property.update(propertyId, { m2: true })).to.throw(Error)
            })
            it('should fail on year being an array', () => {
                expect(() => logic.property.update(propertyId, { year: [] })).to.throw(Error)
            })
            it('should fail on year being a function', () => {
                expect(() => logic.property.update(propertyId, { year: function () { } })).to.throw(Error)
            })
            it('should fail on year being a string', () => {
                expect(() => logic.property.update(propertyId, { year: '123' })).to.throw(Error)
            })
            it('should fail on year being a boolean', () => {
                expect(() => logic.property.update(propertyId, { year: true })).to.throw(Error)
            })
            it('should fail on cadastre being an array', () => {
                expect(() => logic.property.update(propertyId, { cadastre: [] })).to.throw(Error)
            })
            it('should fail on cadastre being a function', () => {
                expect(() => logic.property.update(propertyId, { cadastre: function () { } })).to.throw(Error)
            })
            it('should fail on cadastre being a number', () => {
                expect(() => logic.property.update(propertyId, { cadastre: 123 })).to.throw(Error)
            })
            it('should fail on cadastre being a boolean', () => {
                expect(() => logic.property.update(propertyId, { cadastre: true })).to.throw(Error)
            })
        })
        after(() => mongoose.disconnect())
    })
})