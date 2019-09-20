const { expect } = require('chai')
const logic = require('../../.')
const { Property, User } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - add property', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))


    let dir = ['Requesens', 'Sant-Mori', 'Golf-plaza', 'Blv-Hill', 'Llacuna', 'Mandunga-road']
    let rand = Math.floor(Math.random() * dir.length)

    let ownerId1, propId1, propId2, propId3
    let name, surname, email, password, address, sqm, yearOfConstruction, cadastre, mortgage


    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        address = dir[rand]
        sqm = Math.floor(Math.random() * ((500 - 75) + 1) + 75)
        yearOfConstruction = Math.floor(Math.random() * ((2018 - 1984) + 1) + 1984)
        cadastre = `${Math.random() * 1000000000}`
        mortgage = Math.random() >= 0.5

        const [owner, property] = await Promise.all([User.create({ name, surname, email, password }), Property.create({ address, sqm, yearOfConstruction, cadastre, mortgage })])

        ownerId1 = owner.id
        propId1 = property.id


    })

    beforeEach(async () => {

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        const user = await User.create({ name, surname, email, password })

        ownerId2 = user.id
        await Promise.all([logic.registerOwnerProperty(propId1, ownerId1), logic.registerOwnerProperty(propId1, ownerId2)])

    })

    it('should fail on empty propertyId', () =>
        expect(() =>
            logic.unregisterOwnerProperty('', ownerId1)
        ).to.throw('propId is empty or blank')
    )

    it('should fail on undefined propertyId', () =>
        expect(() =>
            logic.unregisterOwnerProperty(undefined, ownerId1)
        ).to.throw(`propId with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.unregisterOwnerProperty(123456789, ownerId1)
        ).to.throw(`propId with value 123456789 is not a string`)
    )
    //ownerId
    it('should fail on empty ownerId', () =>
        expect(() =>
            logic.unregisterOwnerProperty(propId1, '')
        ).to.throw('ownerId is empty or blank')
    )

    it('should fail on undefined ownerId', () =>
        expect(() =>
            logic.unregisterOwnerProperty(propId1, undefined)
        ).to.throw(`ownerId with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.unregisterOwnerProperty(propId1, 123456798)
        ).to.throw(`ownerId with value 123456798 is not a string`)
    )



    it('property should have two owners', async () => {
        const result = await Property.find({ owners: { $all: [ownerId1, ownerId2] } })

        expect(result).to.exist


    })

    it('schould delete one owner', async () => {
        await logic.unregisterOwnerProperty(propId1, ownerId1)

        const property = await Property.findOne({ _id: propId1 })


        expect(property.owners[0].toString()).to.equal(ownerId2)


    })

    after(() => mongoose.disconnect())
})
