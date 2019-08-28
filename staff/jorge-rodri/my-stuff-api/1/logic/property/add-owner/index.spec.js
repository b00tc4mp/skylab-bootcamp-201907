const { expect } = require('chai')
const logic = require('..')
const { User, Property } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - add owner', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name, surname, email, password, id, address, m2, year, cadastre, owners

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
        const user = await User.create({ name, surname, email, password })
        id = user.id
        return user
    })


    beforeEach(async () => {
        address = `name-${Math.random()}`
        m2 = Math.random()
        year = Math.random()
        cadastre = `cadastre-${Math.random()}`
        owners = [id]

        await Property.deleteMany()

        const property = await Property.create({ address, m2, year, cadastre, owners })

        return property
    })

    it('should succeed on correct data', async () => {
        const ide = '5d5d5530531d455f75da9ff9'
        const result = await logic.addOwner(owners, ide, cadastre)
        expect(result).to.not.exist
        const prop = await Property.findOne({ cadastre })
        const confirm = prop.owners.find(owner => owner._id == ide)
        expect(confirm.toString()).to.equal(ide)

    })

    after(() => mongoose.disconnect())
})