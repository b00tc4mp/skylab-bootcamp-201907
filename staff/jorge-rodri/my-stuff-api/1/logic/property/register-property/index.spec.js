const { expect } = require('chai')
const logic = require('..')
const { Property, User } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - register property', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name, surname, email, password, id, year, address, m2, cadastre, owners


    beforeEach(async() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
        const user = await User.create({ name, surname, email, password })
        id = user.id
        return user
    })

    beforeEach(async() => {
        address = `address-${Math.random()}`
        m2 = Math.random()
        year = Math.random()*2016
        cadastre = `cadastre-${Math.random()}`
        owners = [id, '5d61bea73f43d1169c917202']
        await Property.deleteMany()
        return 0

    })

    it('should succeed on correct data', async() =>{
        const property = await logic.registerProperty(address, m2, year, cadastre, owners) 
                expect(property).to.exist
                expect(property.address).to.equal(address)
                expect(property.m2).to.equal(m2)
                expect(property.year).to.equal(year)
                expect(property.cadastre).to.equal(cadastre)
                expect(property.owners[0].toString()).to.equal(owners[0])
    })
    after(() => mongoose.disconnect())
})