const mongoose = require('mongoose')
const logic = require('..')
const { expect } = require('chai')
const { User, Vehicle } = require('../../../models')

describe.only('logic - register vehicle', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let make, model, year, type, color, electric, plate, id, vehicleId

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
            .then(user => id = user._id.toString())
    })

    it('should succeed on correct data', () =>
        logic.register(id, make, model, year, type, color, electric, plate)
            .then(result => {
                vehicleId = result
                expect(vehicleId).to.exist
                return Vehicle.findOne({ plate })
            })
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

    it('should fail if the vehicle already exists', () =>
       Vehicle.create({ make, model, year, type, color, electric, plate })
           .then (() => logic.register(id, make, model, year, type, color, electric, plate)
               .catch( error =>{
                   expect(error).to.exist
                   expect(error.message).to.equal(`Vehicle already exists.`)
               })
           )
    )

    /* Following 3 tests 
    for every parameter passed to logic */

    it('should fail on empty make', () => 
        expect(() => 
               logic.register(id, '', model, year, type, color, electric, plate)
    ).to.throw('make is empty or blank')
    )

     it('should fail on undefined make', () => 
        expect(() => 
               logic.register(id, undefined, model, year, type, color, electric, plate)
    ).to.throw(`make with value undefined is not a string`)
    )

     it('should fail on wrong data type', () => 
        expect(() => 
               logic.register(id, 123, model, year, type, color, electric, plate)
    ).to.throw(`make with value 123 is not a string`)
    )

    after(() => mongoose.disconnect())
})