const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Vehicle } = require('../../../models')

describe('logic - unregister vehicle', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test',  { useNewUrlParser: true }))

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
            .then(() => Vehicle.create({ make, model, year, type, color, electric, plate }))

            .then(vehicle => vehicleId = vehicle.id)
    })

    it('should succeed on correct data', () =>
        logic.vehicle.unregister(vehicleId)
            .then(result => {
                expect(result).not.to.exist

                return Vehicle.findById(vehicleId)
            })
            .then(vehicle => {
                expect(vehicle).not.to.exist
            })
    )

    it('should fail on unexisting vehicle', () =>
        logic.vehicle.unregister('5d5d5530531d455f75da9fF9')
            .then(() => { throw Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal('wrong credentials'))
    )

    after(() => mongoose.disconnect())
})