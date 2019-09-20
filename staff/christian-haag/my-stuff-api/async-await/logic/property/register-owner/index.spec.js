const { expect } = require('chai')
const logic = require('../../.')
const { Property, User } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - add owner to property', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))


    let dir = ['Requesens', 'Sant-Mori', 'Golf-plaza', 'Blv-Hill', 'Llacuna', 'Mandunga-road']
    let rand = Math.floor(Math.random() * dir.length)

    let ownerId, propId, ownerId2, name, surname, email, password, address, sqm, yearOfConstruction, cadastre, mortgage

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

        await User.deleteMany()
        await Property.deleteMany()

        const [user, property, user2] = await Promise.all([User.create({ name, surname, email, password }), Property.create({ address, sqm, yearOfConstruction, cadastre, mortgage }), User.create({ name, surname, email, password })])

        ownerId = user.id
        propId = property.id
        ownerId2 = user2.id


    })

    //validate
    //---propId
    it('should fail on empty propertyId', () =>
        expect(() =>
            logic.registerOwnerProperty('', ownerId)
        ).to.throw('propertyId is empty or blank')
    )

    it('should fail on undefined propertyId', () =>
        expect(() =>
            logic.registerOwnerProperty(undefined, ownerId)
        ).to.throw(`propertyId with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.registerOwnerProperty(123456789, ownerId)
        ).to.throw(`propertyId with value 123456789 is not a string`)
    )
    //ownerId
    it('should fail on empty ownerId', () =>
        expect(() =>
            logic.registerOwnerProperty(propId, '')
        ).to.throw('ownerId is empty or blank')
    )

    it('should fail on undefined ownerId', () =>
        expect(() =>
            logic.registerOwnerProperty(propId, undefined)
        ).to.throw(`ownerId with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.registerOwnerProperty(propId, 123456798)
        ).to.throw(`ownerId with value 123456798 is not a string`)
    )


    it('schould register a new owner', async () => {
        await logic.registerOwnerProperty(propId, ownerId)

        const prop = await Property.findOne({ _id: propId })
        debugger
        expect(prop.owners.length).to.equal(1)
        const owner = prop.owners[0].toString()
        expect(owner.toString()).to.equal(ownerId)
        expect(owner).to.exist

    })


    it('schould register a second owner', async () => {
        await logic.registerOwnerProperty(propId, ownerId)

        await logic.registerOwnerProperty(propId, ownerId2)

        const prop = await Property.findOne({ _id: propId })

        expect(prop.owners.length).to.equal(2)
        const { owners: [owner1, owner2] } = prop
        expect(owner2.toString()).to.equal(ownerId2)

    })


    it('should fail if owner not exist', async () => {
        try {
            await logic.registerOwnerProperty(propId, '5d5d5530531d455f75da9fF9')
        } catch ({ message }) {
            expect(message).to.equal('No permission to add new owner')
        }
    })


    it('should fail if owner already exist', async () => {
        try {
            await logic.registerOwnerProperty(propId, ownerId2)
        } catch ({ message }) {
            expect(message).to.equal('owner already exist')
        }
    })


    it('should fail if property not exist', async () => {
        try {
            await logic.registerOwnerProperty('5d5d5530531d455f75da9fF9', ownerId)
        } catch ({ message }) {
            expect(message).to.equal('property does not exist')
        }
    })


    after(() => mongoose.disconnect())
})