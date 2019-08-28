const { expect } = require('chai')
const logic = require('..')
const { Vehicle, User } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - register vehicle', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name, surname, email, password, id, brand, model, year, type, color, electric, owner

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        return User.deleteMany()
            .then(() => User.create({ name, surname, email, password }))
            .then(user => id = user.id)
    })

    beforeEach(() => {
        brand = `brand-${Math.random()}`
        model = `model-${Math.random()}`
        year = Math.random()*2016
        debugger
        type = `van`
        color = `color-${Math.random()}`
        electric = Math.round((Math.random() * 1))
        owner = id
        return Vehicle.deleteMany()

    })

    it('should succeed on correct data', () =>
        logic.registerVehicle(brand, model, year, type, color, electric, owner)
            .then(result => { 
                expect(result).not.to.exist

                return Vehicle.findOne({ brand, model, year })
            })
            .then(vehicle => {
                expect(vehicle).to.exist
                expect(vehicle.brand).to.equal(brand)
                expect(vehicle.model).to.equal(model)
                expect(vehicle.year).to.equal(year)
                expect(vehicle.type).to.equal(type)
                expect(vehicle.owner.toString()).to.equal(owner)
            })
    )
    after(() => mongoose.disconnect())
})