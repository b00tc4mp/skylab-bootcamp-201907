const { expect } = require('chai')
const logic = require('../../.')
const { Property, User } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - unregister properties', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))


    let dir = ['Requesens', 'Sant-Mori', 'Golf-plaza', 'Blv-Hill', 'Llacuna', 'Mandunga-road']
    let rand = Math.floor(Math.random() * dir.length)

    let id, name, surname, email, password, address, sqm, yearOfConstruction, cadastre, mortgage


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

        return Promise.all([User.create({ name, surname, email, password }), Property.create({ address, sqm, yearOfConstruction, cadastre, mortgage })
        ])
            .then(([owner, property]) => {
                ownerId1 = owner.id
                propId1 = property.id
                return logic.registerOwnerProperty(propId1, ownerId1)
            })
    })

    // /VALIDATIONS

    //propId
    it('should fail on empty id', () =>
        expect(() =>
            logic.unregisterProperty('', ownerId1)
        ).to.throw('propId is empty or blank')
    )

    it('should fail on undefined id', () =>
        expect(() =>
            logic.unregisterProperty(undefined, ownerId1)
        ).to.throw(`propId with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.unregisterProperty(123456798, ownerId1)
        ).to.throw(`propId with value 123456798 is not a string`)
    )

    //ownerId
    it('should fail on empty id', () =>
        expect(() =>
            logic.unregisterProperty(propId1, '')
        ).to.throw('ownerId is empty or blank')
    )

    it('should fail on undefined id', () =>
        expect(() =>
            logic.unregisterProperty(propId1, undefined)
        ).to.throw(`ownerId with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.unregisterProperty(propId1, 123456798)
        ).to.throw(`ownerId with value 123456798 is not a string`)
    )

    it('schould delete properties by ownerId', () => {
        return logic.unregisterProperty(propId1, ownerId1)
            .then(property => {
                expect(property).to.undefined
            })
    })


    after(() => mongoose.disconnect())

})