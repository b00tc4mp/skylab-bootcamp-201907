const { expect } = require('chai')
const logic = require('../../.')
const { Property, User } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - retrieve all properties', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))


    let dir = ['Requesens', 'Sant-Mori', 'Golf-plaza', 'Blv-Hill', 'Llacuna', 'Mandunga-road']
    let rand = Math.floor(Math.random() * dir.length)

    let ownerId1, propId1, propId2, propId3
    let name, surname, email, password, address, sqm, yearOfConstruction, cadastre, mortgage
    let propArr = []

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        address = dir[rand]
        sqm = Math.floor(Math.random() * ((500 - 75) + 1) + 75)
        yearOfConstruction = Math.floor(Math.random() * ((2018 - 1984) + 1) + 1984)
        cadastre = `${Math.random() * 1000000000}`
        mortgage = Math.random() >= 0.5

        return Promise.all([User.create({ name, surname, email, password }), Property.create({ address, sqm, yearOfConstruction, cadastre, mortgage })
        ])
            .then(([owner, property]) => {
                ownerId1 = owner.id
                propId1 = property.id
            })

    })
    beforeEach(() => {

        address = dir[rand]
        sqm = Math.floor(Math.random() * ((500 - 75) + 1) + 75)
        yearOfConstruction = Math.floor(Math.random() * ((2018 - 1984) + 1) + 1984)
        cadastre = `${Math.random() * 1000000000}`
        mortgage = Math.random() >= 0.5

        return Property.create({ address, sqm, yearOfConstruction, cadastre, mortgage })
            .then((property) => {
                propId2 = property.id
                return Promise.all([logic.registerOwnerProperty(propId1, ownerId1), logic.registerOwnerProperty(propId2, ownerId1)])
            })
            .then(([prop1, prop2]) => {
                propArr.push(prop1, prop2)
            })

    })

    //validations

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


    it('schould fail if user not foud', () => {
        return logic.retrieveAllProperty('5d5d5530531d455f75da9fF9')
            .catch(({ message }) => {
                expect(message).to.equal('no properties found for this user id')
            })
    })

    it('should retrieve all properties of owner1', () => {
        return logic.retrieveAllProperty(ownerId1)
            .then(property => {
                const [prop1, prop2] = property
                expect(prop1.owners[0].toString()).to.equal(ownerId1)
                expect(prop2.owners[0].toString()).to.equal(ownerId1)

            })
    })



    after(() => mongoose.disconnect())
})