const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Property } = require('../../../models')

describe('logic - unregister property', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test',  { useNewUrlParser: true }))

    let address, m2, year, cadastre

    beforeEach(async () => {

        address = `address-${Math.random()}`
        m2 = Number((Math.random()*1000).toFixed())
        year = Number((Math.random()*1000).toFixed())
        cadastre = `cadastre-${Math.random()}`

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

        const result = await logic.property.unregister(propertyId)
        expect(result).not.to.exist

        const property = await Property.findById(propertyId)
        expect(property).not.to.exist
    })

    it('should fail on unexisting property', async () => {
        try {
            await logic.property.unregister('5d5d5530531d455f75da9fF9')
        }catch({ message }) {
            expect(message).to.equal('wrong credentials')
        }      
    })

    after(() => mongoose.disconnect())
})