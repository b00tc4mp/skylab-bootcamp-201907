const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Vehicle } = require('../../../models')

describe('logic - retrieve vehicle', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let vehicleId, _userId

    beforeEach(() => {
        const typeArray = ['sedan', 'cabrio', 'truck']

        make = `vehbrand-${Math.random()}`
        model = `vehmodel-${Math.random()}`
        year = Number((Math.random()* (2019-1980) + 1980).toFixed())
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
            .then(user => id = user.id)
            .then(userId => {
                const newVehicle = new Vehicle({ make, model, year, type, color, electric, plate})
                vehicleId = newVehicle.id
                _userId = userId
                newVehicle.owner.push(userId)
                return newVehicle.save()
            })
    })

    it('should succeed on correct data', () =>
        logic.vehicle.retrieve(vehicleId)
            .then(vehicle => {
                expect(vehicle).to.exist
                expect(vehicle.owner[vehicle.owner.length - 1].toString()).to.equal(_userId)
                expect(vehicle.make).to.equal(make)
                expect(vehicle.model).to.equal(model)
                expect(vehicle.year).to.equal(year)
                expect(vehicle.type).to.equal(type)
                expect(vehicle.color).to.equal(color)
                expect(vehicle.electric).to.equal(electric)
            })
    )

    it('should fail if the vehicle already exists', () => {
       const newVehicle = new Vehicle({ make, model, year, type, color, electric, plate })
       newVehicle.owner = _userId 
       return newVehicle.save()
        .then (() => logic.vehicle.retrieve(vehicleId))
        .catch( error =>{
            expect(error).to.exist
            expect(error.message).to.equal(`Vehicle already exists.`)
            })
           
    })

    /* Make */
    it('should fail on empty id', () => 
        expect(() => 
               logic.vehicle.retrieve('')
    ).to.throw('Vehicle ID is empty or blank')
    )

     it('should fail on undefined id', () => 
        expect(() => 
               logic.vehicle.retrieve(undefined)
    ).to.throw(`Vehicle ID with value undefined is not a string`)
    )

     it('should fail on wrong data type for id', () => 
        expect(() => 
               logic.vehicle.retrieve(123)
    ).to.throw(`Vehicle ID with value 123 is not a string`)
    )
    after(() => mongoose.disconnect())
})