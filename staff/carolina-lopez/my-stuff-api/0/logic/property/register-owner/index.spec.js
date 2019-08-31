const mongoose = require('mongoose')
const logic = require('../..')
const { expect } = require('chai')
const { User, Property } = require('../../../models')

describe('logic - register owner', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', {
        useNewUrlParser: true
    }))

    let address, m2, year, cadastre, id, propertyId
    let name, surname, email, password

    beforeEach(async () => {

        address = `proaddr-${Math.random()}`
        m2 = Number((Math.random() * 1000).toFixed())
        year = Number((Math.random() * 1000).toFixed())
        cadastre = `cadaddr-${Math.random()}`

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `123-${Math.random()}`

        await Property.deleteMany()

        const property = await new Property({
            address,
            m2,
            year,
            cadastre
        })
        propertyId = property.id

        const user = await User.create({
            name,
            surname,
            email,
            password
        })

        const user2 = await User.create({ name, surname, email, password })

        id = user.id
        id2 = user2.id

        property.owners.push(id)
        return await property.save()

    })

    it('should succeed on correct data', async () => {

        await logic.property.registerOwner(propertyId, id, id2)
        const property = await Property.findOne({
            cadastre
        }) // necessari?

        expect(property).to.exist
        /* expect(property.id).to.equal(propertyId)
        expect(property.address).to.equal(address)
        expect(property.m2).to.equal(m2)
        expect(property.year).to.equal(year)
        expect(property.cadastre).to.equal(cadastre) */

    })

    it('should fail if the owner already registered in property', async () => {

        const firstTry = await new Property({
            address,
            m2,
            year,
            cadastre
        })

        firstTry.owners.push(id)
        await firstTry.save()

        debugger
        firstTryId = firstTry._id.toString()

        try {
            debugger
            await logic.property.registerOwner(firstTryId, id, id)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`User with ID ${id} is already an owner of the property ${firstTryId}`)
        }
    })


    /* Following 3 tests 
    for every parameter passed to logic */

    it('should fail on empty address', () =>
        expect(() =>
            logic.property.register(id, ' ', m2, year, cadastre)
        ).to.throw('address is empty or blank')
    )

    it('should fail on undefined address', () =>
        expect(() =>
            logic.property.register(id, undefined, m2, year, cadastre)
        ).to.throw(`address with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.property.register(id, 123, m2, year, cadastre)
        ).to.throw(`address with value 123 is not a string`)
    )

    after(() => mongoose.disconnect())
})