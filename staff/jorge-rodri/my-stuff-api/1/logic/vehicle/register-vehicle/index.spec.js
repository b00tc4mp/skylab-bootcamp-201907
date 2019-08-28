const { expect } = require('chai')
const logic = require('..')
const { Vehicle, User } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - register vehicle', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name, surname, email, password, id, brand, model, year, type, color, electric, owner

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
        const user = await User.create({ name, surname, email, password })
        id = user.id
    })

    beforeEach(async () => {
        brand = `brand-${Math.random()}`
        model = `model-${Math.random()}`
        year = Math.random() * 2016
        type = `van`
        color = `color-${Math.random()}`
        electric = Math.round((Math.random() * 1))
        owner = id
        await Vehicle.deleteMany()
    })

    it('should succeed on correct data', async () => {
        const vehicle = await logic.registerVehicle(brand, model, year, type, color, electric, owner)
        expect(vehicle).to.exist
        expect(vehicle.brand).to.equal(brand)
        expect(vehicle.model).to.equal(model)
        expect(vehicle.year).to.equal(year)
        expect(vehicle.type).to.equal(type)
        expect(vehicle.owner.toString()).to.equal(owner)
    })
    after(() => mongoose.disconnect())
})