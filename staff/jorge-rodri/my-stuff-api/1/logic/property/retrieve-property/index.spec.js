const { expect } = require('chai')
const logic = require('..')
const { Property, User } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - retrieve property', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true, useUnifiedTopology: true }))

    let name, surname, email, password, idU, year, address, m2, cadastre, owners

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        await User.deleteMany()
        const user = await User.create({ name, surname, email, password })
        idU = user.id
    })

    beforeEach(async () => {
        address = `address-${Math.random()}`
        m2 = Math.random()
        year = Math.random() * 2016
        cadastre = `cadastre-${Math.random()}`
        owners = [idU]

        await Property.deleteMany()
        const property = await Property.create({ address, m2, year, cadastre, owners })
        idP = property.id
    })

    it('should succeed on correct data', async () => {
        const property = await logic.retrieveProperty(idU)
        expect(property).to.exist
        expect(property._id.toString()).to.equal(idP)
        expect(property.address).to.equal(address)
        expect(property.m2).to.equal(m2)
        expect(property.year).to.equal(year)
        expect(property.cadastre).to.equal(cadastre)
        expect(property.owners).to.exist

    })
    after(() => mongoose.disconnect())

})