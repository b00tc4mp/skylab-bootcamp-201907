const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Vehicle } = require('../../../models')

describe('logic VEHICLE', () => {
    
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let make, model, year, type, color, electric, plate, vehicleId

    beforeEach(() => {
        const typeArray = ['sedan', 'cabrio', 'truck']

        make = `vehbrand-${Math.random()}`
        model = `vehmodel-${Math.random()}`
        year = Number((Math.random()*1000).toFixed())
        type = `${typeArray[Math.floor(Math.random() * typeArray.length)]}`
        color = `vehcolor-${Math.random()}`
        electric = Boolean(Math.round(Math.random()))
        plate = `vehplate-${Math.random()}`

        return Vehicle.deleteMany()
            .then(() => {
                name = `name-${Math.random()}`
                surname = `surname-${Math.random()}`
                email = `email-${Math.random()}@email.com`
                password = `123-${Math.random()}`

                return User.create({ name, surname, email, password })
            })
            .then(() => { return Vehicle.create({ make, model, year, type, color, electric, plate }) })
            .then(vehicle => { vehicleId = vehicle.id})
    })
    //////////////////

        it('should succeed on correct retrieve vehicle', () =>
            logic.vehicle.retrieve(vehicleId)
                .then(vehicle => {
                    expect(vehicle).to.exist
                    expect(vehicle.id).to.equal(vehicleId)
                    expect(vehicle.make).to.equal(make)
                    expect(vehicle.model).to.equal(model)
                    expect(vehicle.year).to.equal(year)
                    expect(vehicle.type).to.equal(type)
                    expect(vehicle.color).to.equal(color)
                    expect(vehicle.electric).to.equal(electric)
                    })
        )
        it('should fail if the id is not a string', () => expect(() => logic.vehicle.retrieve(12345678).to.throw("id with value '12345678' is not a string")))
        it('should fail if the id is empty or blank', () => expect(() => logic.vehicle.retrieve().to.throw("id is empty or blank")))


    after(() => mongoose.disconnect())
})