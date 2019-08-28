const { expect } = require('chai')
const logic = require('..')
const { Vehicle, User } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - retrieve vehicle', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true, useUnifiedTopology:true }))

    let name, surname, email, password, idU, brand, model, year, type, color, electric, owner, idV

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        return User.deleteMany()
            .then(() => User.create({ name, surname, email, password }))
            .then(user => idU = user.id)
    })

    beforeEach(() => {
        brand = `brand-${Math.random()}`
        model = `model-${Math.random()}`
        year = Math.random() * 2016
        type = 'van'
        color = `model-${Math.random()}`
        electric = Math.round((Math.random() * 1))
        owner = idU

        return Vehicle.deleteMany()
            .then(() => Vehicle.create({ brand, model, year, type, color, electric, owner }))
            .then(vehicle => idV = vehicle.id)
    })

    it('should succeed on correct data', () => {
        logic.retrieveVehicle(idU)
            .then(vehicle => {
                expect(vehicle).to.exist
                expect(vehicle._id.toString()).to.equal(idV)
                expect(vehicle.brand).to.equal(brand)
                expect(vehicle.model).to.equal(model)
                expect(vehicle.year).to.equal(year)
                expect(vehicle.owner).to.exist
            })
    }
    )
    after(() => mongoose.disconnect())

})