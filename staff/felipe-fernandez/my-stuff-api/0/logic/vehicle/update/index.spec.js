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
    describe('update vehicle', () => {
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
        it('should update vehicle info on correct data', () => {
            return logic.vehicle.update(vehicleId, { make: 'newMake', model: 'newModel' })
                .then(() => Vehicle.findOne({ _id: vehicleId }))
                .then(response => {
                    expect(response.make).to.equal('newMake')
                    expect(response.model).to.equal('newModel')
                }).catch(error => expect(error).not.to.exist)
        })

        it('should fail on make being an array', () => {
            expect(() => logic.vehicle.update(vehicleId, { make: [] })).to.throw(Error)
        })
        it('should fail on make being a function', () => {
            expect(() => logic.vehicle.update(vehicleId, { make: function () { } })).to.throw(Error)
        })
        it('should fail on make being a number', () => {
            expect(() => logic.vehicle.update(vehicleId, { make: 123 })).to.throw(Error)
        })
        it('should fail on make being a boolean', () => {
            expect(() => logic.vehicle.update(vehicleId, { make: true })).to.throw(Error)
        })
        it('should fail on model being an array', () => {
            expect(() => logic.vehicle.update(vehicleId, { model: [] })).to.throw(Error)
        })
        it('should fail on model being a function', () => {
            expect(() => logic.vehicle.update(vehicleId, { model: function () { } })).to.throw(Error)
        })
        it('should fail on model being a number', () => {
            expect(() => logic.vehicle.update(vehicleId, { model: 123 })).to.throw(Error)
        })
        it('should fail on model being a boolean', () => {
            expect(() => logic.vehicle.update(vehicleId, { model: true })).to.throw(Error)
        })
        it('should fail on year being an array', () => {
            expect(() => logic.vehicle.update(vehicleId, { year: [] })).to.throw(Error)
        })
        it('should fail on year being a function', () => {
            expect(() => logic.vehicle.update(vehicleId, { year: function () { } })).to.throw(Error)
        })
        it('should fail on year being a string', () => {
            expect(() => logic.vehicle.update(vehicleId, { year: '123' })).to.throw(Error)
        })
        it('should fail on year being a boolean', () => {
            expect(() => logic.vehicle.update(vehicleId, { year: true })).to.throw(Error)
        })
        it('should fail on type being an array', () => {
            expect(() => logic.vehicle.update(vehicleId, { type: [] })).to.throw(Error)
        })
        it('should fail on type being a function', () => {
            expect(() => logic.vehicle.update(vehicleId, { type: function () { } })).to.throw(Error)
        })
        it('should fail on type being a number', () => {
            expect(() => logic.vehicle.update(vehicleId, { type: 123 })).to.throw(Error)
        })
        it('should fail on type being a boolean', () => {
            expect(() => logic.vehicle.update(vehicleId, { type: true })).to.throw(Error)
        })
        it('should fail on color being an array', () => {
            expect(() => logic.vehicle.update(vehicleId, { color: [] })).to.throw(Error)
        })
        it('should fail on color being a function', () => {
            expect(() => logic.vehicle.update(vehicleId, { color: function () { } })).to.throw(Error)
        })
        it('should fail on color being a number', () => {
            expect(() => logic.vehicle.update(vehicleId, { color: 123 })).to.throw(Error)
        })
        it('should fail on color being a boolean', () => {
            expect(() => logic.vehicle.update(vehicleId, { color: true })).to.throw(Error)
        })
        it('should fail on electric being an array', () => {
            expect(() => logic.vehicle.update(vehicleId, { electric: [] })).to.throw(Error)
        })
        it('should fail on electric being a function', () => {
            expect(() => logic.vehicle.update(vehicleId, { electric: function () { } })).to.throw(Error)
        })
        it('should fail on electric being a number', () => {
            expect(() => logic.vehicle.update(vehicleId, { electric: 123 })).to.throw(Error)
        })
        it('should fail on electric being a string', () => {
            expect(() => logic.vehicle.update(vehicleId, { electric: 'true' })).to.throw(Error)
        })
        it('should fail on plate being an array', () => {
            expect(() => logic.vehicle.update(vehicleId, { plate: [] })).to.throw(Error)
        })
        it('should fail on plate being a function', () => {
            expect(() => logic.vehicle.update(vehicleId, { plate: function () { } })).to.throw(Error)
        })
        it('should fail on plate being a number', () => {
            expect(() => logic.vehicle.update(vehicleId, { plate: 123 })).to.throw(Error)
        })
        it('should fail on plate being a boolean', () => {
            expect(() => logic.vehicle.update(vehicleId, { plate: true })).to.throw(Error)
        })
    })
    after(() => mongoose.disconnect())
})