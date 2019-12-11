const mongoose = require('mongoose')
const { expect } = require('chai')
const logic = require('../../../logic')
const { User, Vehicle } = require('../../../models')

describe('logic', () => {
    before(() => {
        mongoose.connect('mongodb://localhost/my-stuff-api-test', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    })

    beforeEach(() => User.deleteMany())
    let userId, vehicleId
    describe('unregister vehicle', () => {
        let name, surname, email, password, make, model, year, type, color, electric, plate
        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`
            const typeArray = ['sedan', 'cabrio', 'truck']
            make = `vehbrand-${Math.random()}`
            model = `vehmodel-${Math.random()}`
            year = Number((Math.random() * (2019 - 1980) + 1980).toFixed())
            type = `${typeArray[Math.floor(Math.random() * typeArray.length)]}`
            color = `vehcolor-${Math.random()}`
            electric = Boolean(Math.round(Math.random()))
            plate = `vehplate-${Math.random()}`
            const newUser = new User({ name, surname, email, password })
            userId = newUser.id
            const newVehicle = new Vehicle({ make, model, year, type, color, electric, plate })
            vehicleId = newVehicle.id
            newVehicle.owner.push(userId)
            return Promise.all([newUser.save(), newVehicle.save()])
        })
        it('should remove vehicle on correct data', () => {
            return logic.vehicle.unregister(vehicleId)
                .then(response => {
                    expect(response).not.to.exist
                    return Vehicle.findById(vehicleId)
                })
                .then(vehicle => {
                    expect(vehicle).not.to.exist
                })
                .catch(error => expect(error).not.to.exist)
        })
        it('should fail on empty id', () =>
            expect(() =>
                logic.vehicle.unregister('')
            ).to.throw('Vehicle id is empty or blank')
        )
        it('should fail on undefined id', () =>
            expect(() =>
                logic.vehicle.unregister(undefined)
            ).to.throw(`Vehicle id with value undefined is not a string`)
        )
        it('should fail on wrong data type for id', () =>
            expect(() =>
                logic.vehicle.unregister(123)
            ).to.throw(`Vehicle id with value 123 is not a string`)
        )
    })
    after(() => mongoose.disconnect())
})