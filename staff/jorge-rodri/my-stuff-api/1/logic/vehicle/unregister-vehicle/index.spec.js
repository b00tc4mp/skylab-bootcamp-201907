const { expect } = require('chai')
const logic = require('..')
const { Vehicle, User } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - delete vehicle', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name, surname, email, password, idU, brand, model, year, type, color, electric, owner, idV

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
        brand = `brand-${Math.random()}`
        model = `model-${Math.random()}`
        year = Math.random() * 2016
        type = 'van'
        color = `model-${Math.random()}`
        electric = Math.round((Math.random() * 1))
        owner = idU

        await Vehicle.deleteMany()
        const vehicle = await Vehicle.create({ brand, model, year, type, color, electric, owner })
        idV = vehicle.id
    })

    it('should succeed on correct data', async () => {

        const result = await logic.unregisterVehicle(idV, owner)
        expect(result).not.to.exist

        const vehicle = await Vehicle.findById(idV)

        expect(vehicle).not.to.exist
    })

    after(() => mongoose.disconnect())

})