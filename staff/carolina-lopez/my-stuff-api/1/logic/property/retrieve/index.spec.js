const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Property } = require('../../../models')

describe('logic - retrieve property', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let propertyId, address, m2, year, cadastre

    beforeEach(async () => {

        address = `proaddr-${Math.random()}`
        m2 = Number((Math.random()*1000).toFixed())
        year = Number((Math.random()*1000).toFixed())
        cadastre = `cadaddr-${Math.random()}`

        await Property.deleteMany()
                name = `name-${Math.random()}`
                surname = `surname-${Math.random()}`
                email = `email-${Math.random()}@email.com`
                password = `123-${Math.random()}`

        await User.create({ name, surname, email, password })

        const property = await Property.create({ address, m2, year, cadastre })

        propertyId = property.id
    })

    it('should succeed on correct data', async () => {

        const property = await logic.property.retrieve(propertyId)
        expect(property).to.exist
        expect(property.id).to.equal(propertyId)
        expect(property.address).to.equal(address)
        expect(property.m2).to.equal(m2)
        expect(property.year).to.equal(year)
        expect(property.cadastre).to.equal(cadastre)
    }) 

    it('should fail if the id is not a string', () => 
        expect(() => logic.property.retrieve(1234).to.throw(`property with id ${1234} does not exist`))
    )

    after(() => mongoose.disconnect())
})