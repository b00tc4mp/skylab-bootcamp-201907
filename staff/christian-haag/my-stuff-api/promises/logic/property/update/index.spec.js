const { expect } = require('chai')
const logic = require('../../.')
const { Property, User } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - update property', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))


    let dir = ['Requesens', 'Sant-Mori', 'Golf-plaza', 'Blv-Hill', 'Llacuna', 'Mandunga-road']
    let rand = Math.floor(Math.random() * dir.length)

    let ownerId, propertyId, name, surname, email, password
    let address, sqm, yearOfConstruction, cadastre, mortgage
    let propUpdate

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`


        address = dir[rand]
        sqm = Math.floor(Math.random() * ((500 - 75) + 1) + 75)
        yearOfConstruction = Math.floor(Math.random() * ((2018 - 1984) + 1) + 1984)
        cadastre = toString(Math.random() * 1000000000)
        mortgage = Math.random() >= 0.5

        propUpdate = {
            cadastre: '123456KO0987SS2345TK',
            sqm: 250
        }

        return User.deleteMany()
            .then(() => Promise.all([User.create({ name, surname, email, password }), Property.create({ address, sqm, yearOfConstruction, cadastre, mortgage })]))
            .then(([user, property]) => {
                ownerId = user.id
                propertyId = property.id
                return logic.registerOwnerProperty(propertyId, ownerId)
            })
    })

    it('should fail on empty id', () =>
        expect(() =>
            logic.retrieveAllProperty('')
        ).to.throw('id is empty or blank')
    )

    it('should fail on undefined id', () =>
        expect(() =>
            logic.retrieveAllProperty(undefined)
        ).to.throw(`id with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.retrieveAllProperty(123456798)
        ).to.throw(`id with value 123456798 is not a string`)
    )

    it('should match with registered data', () => {
        return Property.findOne({ _id: propertyId }).lean()
            .then(result => {
                expect(result.cadastre).to.equal(cadastre)
                expect(result.sqm).to.equal(sqm)
            })
    })

    it('should update property data', () => {
        return logic.updateProperty(propertyId, propUpdate)
            .then(() => {
                return Property.findOne({ _id: propertyId }).lean()
            })
            .then(result => {
                expect(result.cadastre).to.equal(propUpdate.cadastre)
                expect(result.sqm).to.equal(propUpdate.sqm)
            })
    })

    after(() => mongoose.disconnect())
})